class PostsSerializer < ActiveModel::Serializer
  format_keys :lower_camel
  has_many :tags
  attributes :id, :title, :accepted, :published_at, :status

  def published_at
    object.published_at.try(:strftime,'%b %d, %Y') || 'not publishing yet'
  end

  def status
    return 'not accepted' unless object.accepted
    object.published_at <= Time.current ? 'publishing' : 'will publish'
  end

  # def filter(keys)
  #   keys.delete :tags if scope.try(:admin?)
  #   keys.delete :status unless scope.try(:admin?)
  # end
end
