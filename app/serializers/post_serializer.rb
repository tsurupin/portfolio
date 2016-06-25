class PostSerializer < ActiveModel::Serializer
  self.root = false
  format_keys :lower_camel
  attributes :title,
             :published_at,
             :prev_id,
             :prev_title,
             :next_id,
             :next_title

  has_many :items
  has_many :tags

  def published_at
    object.published_at.try(:strftime, '%b %d, %Y')
  end

  def prev_id
    prev_post.try(:id)
  end

  def prev_title
    prev_post.try(:title)
  end

  def next_id
    next_post.try(:id)
  end

  def next_title
    next_post.try(:title)
  end

  private

  def prev_post
    @prev_post ||=  Post::Search.previous(object.published_at)
  end

  def next_post
    @next_post ||= Post::Search.next(object.published_at)
  end

end
