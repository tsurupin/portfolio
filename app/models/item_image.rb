# == Schema Information
#
# Table name: item_images
#
#  id      :integer          not null, primary key
#  image   :string(255)      not null
#  caption :string(255)
#

class ItemImage < ActiveRecord::Base
  include DataURIToImageConverter
  has_one :item, as: :target, dependent: :destroy
  validates :image, presence: true

  mount_uploader :image, ItemImageUploader

  def trim_attributes_and_save!(params)
    self.caption = params['caption'] if params['caption']
    if params['image']&.start_with?('data')
      self.image = convert_data_uri_to_upload(params['image'])
    end
    save!
  end
end
