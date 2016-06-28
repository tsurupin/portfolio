# == Schema Information
#
# Table name: tags
#
#  id         :integer          not null, primary key
#  name       :string(255)      not null
#  created_at :datetime
#  updated_at :datetime
#

require 'rails_helper'

RSpec.describe Tag, type: :model do
  describe '#validation' do
    it { is_expected.to have_many(:taggings).dependent(:destroy) }
    it { is_expected.to have_many(:posts).through(:taggings) }
    it { is_expected.to have_many(:projects).through(:taggings) }
    it { is_expected.to validate_presence_of(:name) }
    it { expect(create(:tag, name: 'hoge')).to validate_uniqueness_of(:name).with_message('hoge is already used') }
  end
end
