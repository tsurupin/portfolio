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

class Post < ActiveRecord::Base
  PAGINATES_PER = 20
  paginates_per PAGINATES_PER

  has_many :taggings, as: :subject, dependent: :destroy
  has_many :tags, through: :taggings
  has_many :items, -> { order('sort_rank asc') }, dependent: :destroy

  validates :title, presence: true, uniqueness: { message: '%{value} is already used' }
  after_update :delete_cache

  def status
    # NOTE: 0: not accepted, 1: will publish, 2: publishing
    return 0 unless accepted
    published_at >= Time.current ? 1 : 2
  end

  private

  def delete_cache
    Rails.cache.delete('cached_home') if accepted
    Rails.cache.delete("cached_posts/#{id}")
    Rails.cache.delete("cached_posts/#{id}?previewing=true")
    Rails.cache.delete_matched(/cached_posts\?page=\d?&tag_id=\w*/)
  end
end
