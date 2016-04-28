# == Schema Information
#
# Table name: post_tags
#
#  id         :integer          not null, primary key
#  name       :string(255)      not null
#  created_at :datetime
#  updated_at :datetime
#

require 'rails_helper'

RSpec.describe PostTag, type: :model do
  describe '#validation' do
    subject { create(:post_tag) }
    it { is_expected.to have_many(:post_taggings).dependent(:destroy) }
    it { is_expected.to have_many(:posts).through(:post_taggings) }
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_uniqueness_of(:name) }
  end

end
