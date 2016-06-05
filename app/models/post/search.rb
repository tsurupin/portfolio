# == Schema Information
#
# Table name: posts
#
#  id           :integer          not null, primary key
#  title        :string(255)      not null
#  description  :text(65535)
#  accepted     :boolean          default("0"), not null
#  published_at :datetime
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Post::Search < ActiveType::Record[Post]

  scope :client_search, lambda { |options = {}|
    accepted
      .related_by_tag(options[:tag])
      .latest
  }

  scope :related_by_tag, ->(tag_id = nil) {
    joins(:taggings).merge(Tagging.by_tag(tag_id)) if tag_id
  }

  scope :accepted, -> { where(accepted: true) }
  scope :latest, -> { order(updated_at: :desc) }

  scope :previous, ->(post_id) { accepted.where('id < ?', post_id).last }
  scope :next, ->(post_id) { accepted.where('id > ?', post_id).first }

end
