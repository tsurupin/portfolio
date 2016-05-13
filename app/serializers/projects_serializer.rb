class ProjectsSerializer < ActiveModel::Serializer
  format_keys :lower_camel
  attributes :id, :title, :description, :name, :imageURL, :sourceURL, :sampleURL, :project_tags, :accepted

  def published_at
    object.published_at.try(:strftime,'%d-%m, %H:%M') || 'not publishing yet'
  end

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
