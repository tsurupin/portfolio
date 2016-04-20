# == Schema Information
#
# Table name: posts
#
#  id           :integer          not null, primary key
#  title        :string           not null
#  description  :text             not null
#  accepted     :boolean          default("f"), not null
#  published_at :datetime
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Post < ApplicationRecord
  has_many :post_taggings, dependent: :destroy
  has_many :post_tags, through: :post_taggins
  has_many :items, dependent: :destroy
  has_many :comments, dependent: :destroy

  validates :title, presence: true
  validates :description, presence: true
end
