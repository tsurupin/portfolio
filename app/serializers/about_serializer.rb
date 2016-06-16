class AboutSerializer < ActiveModel::Serializer
  self.root = false
  format_keys :lower_camel
  attributes :image, :description

  has_many :social_accounts

  def image
    object.image_url
  end

end
