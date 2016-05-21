class AuthorSerializer < ActiveModel::Serializer
  format_keys :lower_camel
  attributes :email, :name, :image, :description, :github_url

  has_many :social_accounts, root: :social_accounts

  def image
    object.try(:image_url)
  end

end
