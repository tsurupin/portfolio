class Cms::AuthorSerializer < ActiveModel::Serializer
  self.root = false
  format_keys :lower_camel
  attributes :id,
             :email,
             :name,
             :image,
             :description,
             :introduction

  has_many :social_accounts, root: :social_accounts

  def image
    object.try(:image_url)
  end

  def social_accounts
    # TODO: detach from here and refactor with decorator or model method
    (SocialAccount.account_types.keys - object.social_accounts.map(&:account_type))
      .each_with_object(object.social_accounts.to_a) do |type, array|
      array << object.social_accounts.new(account_type: type)
    end.sort_by { |account| account[:account_type] }
  end
end
