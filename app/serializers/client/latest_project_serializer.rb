class Client::LatestProjectSerializer < ActiveModel::Serializer
  self.root = false
  format_keys :lower_camel
  attributes :id, :title, :image

  def image
    object.image_url
  end
end
