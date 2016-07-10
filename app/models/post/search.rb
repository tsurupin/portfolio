# == Schema Information
#
# Table name: posts
#
#  id            :integer          not null, primary key
#  title         :string(255)      not null
#  accepted      :boolean          default("0"), not null
#  published_at  :datetime
#  lead_sentence :string(255)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Post::Search < ActiveType::Record[Post]
  include RelatedTagSearch
  paginates_per Post::PAGINATES_PER

  def self.client_search(options = {})
    eager_load(:tags)
      .published
      .related_by_tag(options[:tag_id])
      .latest
  end

  def self.published
    where('accepted = ? and published_at <= ?', true, Time.current)
  end

  def self.latest
    order(published_at: :desc)
  end

  def previous
    Post::Search.published
                .where('id != ? and published_at < ?', id, published_at)
                .latest
                .limit(1)
                .try(:first)
  end

  def next
    Post::Search.published
                .where('id != ? and published_at > ?', id, published_at)
                .latest
                .limit(1)
                .try(:first)
  end
end
