class Cms::PostSerializer < ActiveModel::Serializer
  self.root = false
  format_keys :lower_camel
  attributes :id,
             :title,
             :accepted,
             :lead_sentence,
             :published_at,
             :tag_suggestions

  has_many :items
  has_many :taggings, root: :tags, serializer: Cms::TaggingSerializer

  def published_at
    object.published_at.try(:strftime, '%Y/%m/%d %H:%M')
  end

  def tag_suggestions
    Tag.pluck(:name)
  end
end
