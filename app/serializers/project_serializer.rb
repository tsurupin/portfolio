class ProjectSerializer < ActiveModel::Serializer
  format_keys :lower_camel
  attributes :id, :title, :accepted, :description, :sourceURL, :sampleURL, :image, :tag_suggestions

  has_many :project_taggings, root: :tags

  def image
    object.try(:image_url)
  end

  def sourceURL
    object.try(:source_url)
  end

  def sampleURL
    object.try(:sample_url)
  end

  def tag_suggestions
    ProjectTag.pluck(:name)
  end

end
