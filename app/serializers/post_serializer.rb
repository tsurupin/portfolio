class PostSerializer < ActiveModel::Serializer
  self.root = false
  format_keys :lower_camel
  attributes :id, :title, :accepted, :published_at, :tag_suggestions

  has_many :items
  has_many :taggings, root: :tags

  def published_at
    object.published_at.try(:strftime,'%d-%m, %H:%M') || 'not publishing yet'
  end

  def tag_suggestions
    Tag.pluck(:name)
  end

end
