class PostsSerializer < ActiveModel::Serializer
  format_keys :lower_camel
  attributes :id, :title, :accepted, :published_at, :status

  def published_at
    object.published_at.try(:strftime,'%d-%m, %H:%M') || 'not publishing yet'
  end

  def status
    return 'not accepted' unless object.accepted
    object.published_at <= Time.current ? 'publishing' : 'will publish'
  end
end
