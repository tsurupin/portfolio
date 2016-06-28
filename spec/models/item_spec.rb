# == Schema Information
#
# Table name: items
#
#  id          :integer          not null, primary key
#  post_id     :integer          not null
#  sort_rank   :integer          not null
#  target_id   :integer          not null
#  target_type :string(255)      not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'rails_helper'

RSpec.describe Item, type: :model do
  describe '#validation' do
    it { is_expected.to belong_to(:post).touch(true) }
    it { is_expected.to belong_to(:target) }
    it { is_expected.to validate_presence_of(:sort_rank) }
    it { is_expected.to validate_presence_of(:target_type) }
  end

  describe '#destroy_target after destroying item' do
    it 'destroys the target associated with the item' do
      twitter = create(:item_twitter)
      item = create(:item, target: twitter)
      expect { item.destroy }.to change { ItemTwitter.count }.by(-1)
    end
  end
end
