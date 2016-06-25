# == Schema Information
#
# Table name: projects
#
#  id          :integer          not null, primary key
#  title       :string(255)      not null
#  description :text(65535)
#  image       :string(255)
#  caption     :string(255)
#  source_url  :string(255)
#  accepted    :boolean          default("0"), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'rails_helper'

RSpec.describe Post::Search, type: :model do
  describe '.previous' do
    context 'when published_at is nil' do
      it 'returns empty array' do
        post = create(:post, published_at: nil)
        create(:post, published_at: 1.days.ago)
        create(:post, :accepted, published_at: 2.days.ago)
        expect(Post::Search.previous(post)).to eq nil
      end
    end

    context 'when published_at is not nil' do
      it 'returns the accepted previous post' do
        post = create(:post, :accepted, published_at: Time.current)
        create(:post, published_at: 1.days.ago)
        accepted_previous_post = create(:post, :accepted, published_at: 2.days.ago)
        expect(Post::Search.previous(post).id).to eq accepted_previous_post.id
      end

      it 'returns empty array because of no corresponding data' do
        post = create(:post, :accepted, published_at: Time.current)
        create(:post, published_at: 1.days.ago)
        expect(Post::Search.previous(post)).to eq nil
      end
    end
  end

  describe '.next' do
    context 'when published_at is nil' do
      it 'returns empty array' do
        post = create(:post, published_at: nil)
        create(:post, published_at: 2.days.from_now)
        create(:post, :accepted, published_at: 1.days.from_now)
        expect(Post::Search.next(post)).to eq nil
      end
    end

    context 'when published_at is not nil' do
      it 'returns the accepted next post' do
        post = create(:post, :accepted, published_at: Time.current)
        create(:post, published_at: 2.days.from_now)
        accepted_next_post = create(:post, :accepted, published_at: 1.days.from_now)
        expect(Post::Search.next(post).id).to eq accepted_next_post.id
      end

      it 'returns empty array because of no corresponding data' do
        post = create(:post, :accepted, published_at: Time.current)
        create(:post, published_at: 1.days.from_now)
        expect(Post::Search.next(post)).to eq nil
      end
    end
  end

end
