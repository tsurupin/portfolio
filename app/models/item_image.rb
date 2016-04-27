# == Schema Information
#
# Table name: item_images
#
#  id         :integer          not null, primary key
#  source_url :text
#  image      :string           not null
#

class ItemImage < ActiveRecord::Base
  has_one :item, as: :target, dependent: :destroy

  validates :source_url, format: { with: URI.regexp }, if: proc { |i| i.source_url.present? }
  validates :image, presence: true

  mount_uploader :image, ItemImageUploader
end
