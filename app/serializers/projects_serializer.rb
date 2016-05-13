class ProjectsSerializer < ActiveModel::Serializer
  format_keys :lower_camel
  attributes :id, :title, :description, :imageURL, :sourceURL, :sampleURL, :accepted, :project_tags

  def imageURL
    object.try(:image_url)
  end

  def sourceURL
    object.try(:source_url)
  end

  def sampleURL
    object.try(:sample_url)
  end

  def project_tags
    object.project_tags.map(&:name)
  end
end
