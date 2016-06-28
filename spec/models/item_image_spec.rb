# == Schema Information
#
# Table name: item_images
#
#  id      :integer          not null, primary key
#  image   :string(255)      not null
#  caption :string(255)
#

require 'rails_helper'

RSpec.describe ItemImage, type: :model do
  describe '#validation' do
    it { is_expected.to have_one(:item).dependent(:destroy) }
    it { is_expected.to validate_presence_of(:image) }
  end

  describe '#trim_attributes_and_save!' do
    context 'when params include image' do
      it 'creates a new record' do
        image = build(:item_image, image: nil)
        params = { 'image' => 'data:image/jpeg;base64,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' }
        expect { image.trim_attributes_and_save!(params) }.to change { ItemImage.count }.by(1)
      end

      it 'updated the record' do
        image = create(:item_image)
        params = { 'caption' => 'caption', 'image' => image.image_url }
        expect { image.trim_attributes_and_save!(params) }
          .to change { ItemImage.find(image.id).caption }.from(nil).to('caption')
      end

      it 'raises the record error because of wrong data' do
        image = build(:item_image, image: nil)
        params = { 'image' => 'data://wrong_data' }
        expect { image.trim_attributes_and_save!(params) }
          .to raise_error(ActiveRecord::RecordInvalid)
      end
    end

    context 'when params do not include image' do
      it 'raises the record invalid error' do
        image = build(:item_image, image: nil)
        params = {}
        expect { image.trim_attributes_and_save!(params) }
          .to raise_error(ActiveRecord::RecordInvalid)
      end
    end
  end
end
