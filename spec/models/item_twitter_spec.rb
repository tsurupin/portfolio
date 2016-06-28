# == Schema Information
#
# Table name: item_twitters
#
#  id         :integer          not null, primary key
#  twitter_id :string(255)      not null
#

require 'rails_helper'

RSpec.describe ItemTwitter, type: :model do
  describe '#validation' do
    it { is_expected.to have_one(:item).dependent(:destroy) }
    it { is_expected.to validate_presence_of(:twitter_id) }
  end

  describe '#trim_attributes_and_save!' do
    it 'increments the record count' do
      twitter = build(:item_twitter, twitter_id: nil)
      params = { 'twitter_id' => '11111' }
      expect { twitter.trim_attributes_and_save!(params) }.to change { ItemTwitter.count }.by(1)
    end

    it 'raises the record invalid error' do
      twitter = build(:item_twitter, twitter_id: nil)
      params = {}
      expect { twitter.trim_attributes_and_save!(params) }.to raise_error(ActiveRecord::RecordInvalid)
    end
  end
end
