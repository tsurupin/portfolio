class PostsSerializer < ActiveModel::Serializer
  format_keys :lower_camel
  has_many :tags
  attributes :id, :title, :accepted, :published_at, :status

  def published_at
    object.published_at.try(:strftime,'%b %d, %Y') || '-'
  end

  def status
    # NOTE: 0: not accepted, 1: will publish, 2: publishing
    return 0 unless object.accepted
    (object.published_at && object.published_at <= Time.current) ? 2 : 1
  end
end
