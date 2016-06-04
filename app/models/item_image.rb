# == Schema Information
#
# Table name: item_images
#
#  id    :integer          not null, primary key
#  image :string(255)      not null
#

class ItemImage < ActiveRecord::Base
  include DataURIToImageConverter
  has_one :item, as: :target, dependent: :destroy
  validates :image, presence: true

  mount_uploader :image, ItemImageUploader

  private
  def save_from_association!(params)
    self.caption = params['caption'] if params['caption']
    self.image = convert_data_uri_to_upload(params['image']) if params['image']&.start_with?('data')
    self.save!
  end
end
