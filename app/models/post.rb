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
  PAGINATES_PER = 20.freeze

  has_many :taggings, as: :subject, dependent: :destroy
  has_many :tags, through: :taggings
  has_many :items, -> { order('sort_rank asc') }, dependent: :destroy
  has_many :comments, dependent: :destroy

  validates :title, presence: true, uniqueness: { message: "%{value} is already used"}

  paginates_per PAGINATES_PER

end
