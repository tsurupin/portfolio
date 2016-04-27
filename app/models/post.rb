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

class Post < ActiveRecord::Base
  has_many :post_taggings, dependent: :destroy
  has_many :post_tags, through: :post_taggins
  has_many :items, -> { order('sort_rank asc') }, dependent: :destroy
  has_many :comments, dependent: :destroy

  validates :title, presence: true
end
