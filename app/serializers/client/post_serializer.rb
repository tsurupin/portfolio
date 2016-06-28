class Client::PostSerializer < ActiveModel::Serializer
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
    ActiveType.cast(object, Post::Search).previous
  end

  def next_post
    ActiveType.cast(object, Post::Search).next
  end
end
