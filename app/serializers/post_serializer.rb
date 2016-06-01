class PostSerializer < ActiveModel::Serializer
  self.root = false
  format_keys :lower_camel
  attributes :title, :published_at

  has_many :items
  has_many :tags

  def published_at
    object.published_at.strftime('%b %d, %Y')
  end

end
