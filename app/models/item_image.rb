# == Schema Information
#
# Table name: item_images
#
#  id    :integer          not null, primary key
#  image :string(255)      not null
#

class ItemImage < ActiveRecord::Base
  has_one :item, as: :target, dependent: :destroy
  validates :image, presence: true

  mount_uploader :image, ItemImageUploader
end
