# == Schema Information
#
# Table name: taggings
#
#  id           :integer          not null, primary key
#  tag_id       :integer          not null
#  subject_id   :integer          not null
#  subject_type :string(255)      not null
#  created_at   :datetime
#  updated_at   :datetime
#

require 'rails_helper'

RSpec.describe Tagging, type: :model do
  describe '#validation' do
    it { is_expected.to belong_to(:subject).touch(true) }
    it { is_expected.to belong_to(:tag) }
    it { is_expected.to validate_presence_of(:tag) }
  end
end
