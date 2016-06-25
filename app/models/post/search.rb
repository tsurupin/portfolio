# == Schema Information
#
# Table name: posts
#
#  id           :integer          not null, primary key
#  title        :string(255)      not null
#  accepted     :boolean          default("0"), not null
#  published_at :datetime
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Post::Search < ActiveType::Record[Post]
  include ClientSearch

  def self.previous(post)
    accepted
      .where('id != ? and published_at < ?', post.id, post.published_at)
      .order('published_at desc')
      .limit(1)
      .try(:first)
  end

  def self.next(post)
    accepted
      .where('id != ? and published_at > ?', post.id, post.published_at)
      .order('published_at asc')
      .limit(1)
      .try(:first)
  end
end
