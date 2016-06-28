class Cms::PostsSerializer < ActiveModel::Serializer
  format_keys :lower_camel
  attributes :id,
             :title,
             :accepted,
             :published_at,
             :status

  def published_at
    object.published_at.try(:strftime, '%b %d, %Y') || '-'
  end
end
