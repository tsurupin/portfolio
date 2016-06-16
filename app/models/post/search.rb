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

  scope :previous, ->(post_id) { accepted.where('id < ?', post_id).last }
  scope :next, ->(post_id) { accepted.where('id > ?', post_id).first }
end
