class PostsSerializer < ActiveModel::Serializer
  attributes :id, :title, :accepted, :publishedAt, :status

  def publishedAt
    object.published_at.try(:strftime,'%d-%m, %H:%M') || 'not publishing yet'
  end

  def status
    return 'not accepted' unless object.accepted
    object.published_at >= Time.current ? 'publishing' : 'will publish'
  end
end
