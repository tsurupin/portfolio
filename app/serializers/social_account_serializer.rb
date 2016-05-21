class SocialAccountSerializer < ActiveModel::Serializer
  format_keys :lower_camel
  attributes :name, :url, :image,

  def image
    object.try(:image_url)
  end

end
