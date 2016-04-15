# == Schema Information
#
# Table name: item_twitters
#
#  id                 :integer          not null, primary key
#  source_url         :text             not null
#  description        :text             not null
#  author_image_url   :string           not null
#  author_name        :string           not null
#  author_screen_name :string           not null
#

class ItemTwitter < ApplicationRecord
  has_one :item, as: :target, dependent: :destroy

  validates :source_url, presence: true
  validates :description, presence: true
  validates :author_name, presence: true
  validates :author_screen_name, presence: true
  validates :author_image_url, presence: true
end
