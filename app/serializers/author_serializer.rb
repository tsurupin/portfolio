class AuthorSerializer < ActiveModel::Serializer
  format_keys :lower_camel
  attributes :email, :name, :image, :description

  has_many :social_accounts, root: :social_accounts

  def image
    object.try(:image_url)
  end

  def social_accounts
    (SocialAccount.account_types.keys - object.social_accounts.map(&:account_type))
      .each_with_object(object.social_accounts.to_a) do |type, array|
      array << object.social_accounts.new(account_type: type)
    end.sort_by{ |account| account[:account_type] }
  end

end
