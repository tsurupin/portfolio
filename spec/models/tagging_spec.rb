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
    it { expect(create(:tagging, :subject_post)).to validate_uniqueness_of(:tag_id).scoped_to([:subject_id, :subject_type]) }
  end

  describe '#delegation' do
    it { is_expected.to delegate_method(:name).to(:tag) }
  end

  describe '.by_tag' do
    it 'returns the records associated with the tag id in descending order by updated_at' do
      tag = create(:tag)
      tagging1 = create(:tagging, :subject_post, tag: tag, updated_at: 2.days.ago)
      tagging2 = create(:tagging, :subject_post, tag: tag, updated_at: Time.current)
      different_tag = create(:tag)
      create(:tagging, :subject_post, tag: different_tag)

      expect(Tagging.by_tag(tag.id)).to eq([tagging2, tagging1])
    end
  end
end
