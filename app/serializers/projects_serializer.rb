class ProjectsSerializer < ActiveModel::Serializer
  format_keys :lower_camel
  has_many :tags
  attributes :id, :title, :description, :image, :source_url, :sample_url, :accepted#, :tags

  def image
    object.try(:image_url)
  end

  # def tags
  #   object.tags.map(&:name)
  # end
end
