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

RSpec.describe Post::Search, type: :model do
  describe '.previous' do
    context 'when published_at is nil' do
      it 'returns empty array' do
        post = ActiveType.cast(create(:post, :accepted, published_at: nil), Post::Search)
        create(:post, published_at: 1.day.ago)
        create(:post, :accepted, published_at: 2.days.ago)
        expect(post.previous).to eq nil
      end
    end

    context 'when published_at is not nil' do
      it 'returns the accepted previous post' do
        post = ActiveType.cast(create(:post, :accepted, published_at: Time.current), Post::Search)
        create(:post, published_at: 1.day.ago)
        accepted_previous_post = create(:post, :accepted, published_at: 2.days.ago)
        expect(post.previous.id).to eq accepted_previous_post.id
      end

      it 'returns empty array because of no corresponding data' do
        post = ActiveType.cast(create(:post, :accepted, published_at: Time.current), Post::Search)
        create(:post, published_at: 1.day.ago)
        expect(post.previous).to eq nil
      end
    end
  end

  describe '.next' do
    context 'when published_at is nil' do
      it 'returns empty array' do
        post = ActiveType.cast(create(:post, :accepted, published_at: nil), Post::Search)
        create(:post, published_at: 1.day.ago)
        create(:post, :accepted, published_at: 2.days.ago)
        expect(post.next).to eq nil
      end
    end

    context 'when published_at is not nil' do
      it 'returns the accepted next post' do
        post = ActiveType.cast(create(:post, :accepted, published_at: 3.days.ago), Post::Search)
        create(:post, published_at: 1.day.ago)
        accepted_next_post = create(:post, :accepted, published_at: 2.days.ago)
        expect(post.next.id).to eq accepted_next_post.id
      end

      it 'returns empty array because of no corresponding data' do
        post = ActiveType.cast(create(:post, :accepted, published_at: 3.days.ago), Post::Search)
        create(:post, published_at: 1.day.ago)
        expect(post.next).to eq nil
      end
    end
  end
end
