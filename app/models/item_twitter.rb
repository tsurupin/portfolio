# == Schema Information
#
# Table name: item_twitters
#
#  id                 :integer          not null, primary key
#  source_url         :text(65535)      not null
#  description        :text(65535)      not null
#  author_image_url   :string(255)      not null
#  author_name        :string(255)      not null
#  author_screen_name :string(255)      not null
#

class ItemTwitter < ActiveRecord::Base
  has_one :item, as: :target, dependent: :destroy

  validates :source_url, presence: true, format: { with: URI.regexp }
  validates :description, presence: true
  validates :author_name, presence: true
  validates :author_screen_name, presence: true
  validates :author_image_url, presence: true
end
