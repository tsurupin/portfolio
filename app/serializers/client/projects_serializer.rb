class Client::ProjectsSerializer < ActiveModel::Serializer
  format_keys :lower_camel
  has_many :tags
  attributes :id,
             :title,
             :description,
             :image,
             :caption,
             :source_url

  def image
    object.try(:image_url)
  end
end
