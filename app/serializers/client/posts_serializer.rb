class Client::PostsSerializer < ActiveModel::Serializer
  format_keys :lower_camel
  has_many :tags
  attributes :id,
             :title,
             :lead_sentence,
             :published_at

  def published_at
    object.published_at.try(:strftime, '%b %d, %Y') || '-'
  end
end
