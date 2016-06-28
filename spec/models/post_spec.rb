# == Schema Information
#
# Table name: posts
#
#  id            :integer          not null, primary key
#  title         :string(255)      not null
#  accepted      :boolean          default("0"), not null
#  published_at  :datetime
#  lead_sentence :string(255)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

require 'rails_helper'

RSpec.describe Post, type: :model do
  describe '#validation' do
    it { is_expected.to have_many(:taggings).dependent(:destroy) }
    it { is_expected.to have_many(:tags).through(:taggings) }
    it { is_expected.to have_many(:items).order('sort_rank asc').dependent(:destroy) }
    it { is_expected.to validate_presence_of(:title) }
    it { expect(create(:post, title: 'title')).to validate_uniqueness_of(:title).with_message('title is already used') }
  end

  describe '#status' do
    context 'when accepted is false' do
      it 'returns 0' do
        post = create(:post, accepted: false)
        expect(post.status).to eq 0
      end
    end

    context 'when accepted is true' do
      context 'when published_at is after now' do
        it 'returns 1' do
          post = create(:post, accepted: true, published_at: 1.day.from_now)
          expect(post.status).to eq 1
        end
      end

      context 'when published_at is before now' do
        it 'returns 2' do
          post = create(:post, accepted: true, published_at: 1.day.ago)
          expect(post.status).to eq 2
        end
      end
    end
  end
end
