# == Schema Information
#
# Table name: item_texts
#
#  id          :integer          not null, primary key
#  description :text(65535)      not null
#

require 'rails_helper'

RSpec.describe ItemText, type: :model do
  describe '#validation' do
    it { is_expected.to have_one(:item).dependent(:destroy) }
    it { is_expected.to validate_presence_of(:description) }
  end

  describe '#trim_attributes_and_save!' do
    it 'increments the record count' do
      text = build(:item_text, description: nil)
      params = { 'description' => 'description' }
      expect { text.trim_attributes_and_save!(params) }.to change { ItemText.count }.by(1)
    end

    it 'raises the record invalid error' do
      text = build(:item_text, description: nil)
      params = {}
      expect { text.trim_attributes_and_save!(params) }.to raise_error(ActiveRecord::RecordInvalid)
    end
  end
end
