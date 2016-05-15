class ProjectsSerializer < ActiveModel::Serializer
  format_keys :lower_camel
  attributes :id, :title, :description, :imageURL, :sourceURL, :sampleURL, :accepted, :tags

  def imageURL
    object.try(:image_url)
  end

  def sourceURL
    object.try(:source_url)
  end

  def sampleURL
    object.try(:sample_url)
  end

  def tags
    object.tags.map(&:name)
  end
end
