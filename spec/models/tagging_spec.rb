# == Schema Information
#
# Table name: post_taggings
#
#  id          :integer          not null, primary key
#  post_id     :integer          not null
#  post_tag_id :integer          not null
#

require 'rails_helper'

RSpec.describe Tagging, type: :model do
  describe '#validation' do
    it { is_expected.to belong_to(:subject).touch(true) }
    it { is_expected.to belong_to(:tag) }
    it { is_expected.to validate_presence_of(:tag) }
  end
end
