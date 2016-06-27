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

RSpec.describe Post::Form, type: :model do
  describe '#validations' do
    it { is_expected.to accept_nested_attributes_for(:items) }
    it { is_expected.to accept_nested_attributes_for(:taggings) }

    context 'published_at' do
      let(:post) { Post::Form.find(original_post.id) }
      context 'when published_at is nil' do
        it 'raises the record error' do
          post_form = ActiveType.cast(create(:post), Post::Form)
          expect { post_form.update!(accepted: true) }.to raise_error(ActiveRecord::RecordInvalid)
        end
      end

      context 'when published_at is not null' do
        it 'raises the record error' do
          post_form = ActiveType.cast(create(:post, published_at: Time.current), Post::Form)
          expect { post_form.update!(accepted: true) }.not_to raise_error(ActiveRecord::RecordInvalid)
        end
      end
    end
  end

  describe '#save_from_associations' do
    context 'when creating a new record' do
      context 'when lack of necessary params' do
        it 'fails because of lack of post params' do
          params = {
            'published_at' => Time.current,
            'taggings_attributes' => [{ 'text' => 'name' }],
            'items_attributes' => [
              {
                'target_type' => 'ItemTwitter',
                'twitter_id' => '1234',
                'sort_rank' => 1
              },
              {
                'target_type' => 'ItemImage',
                'caption' => 'caption',
                'image' => 'data:image/jpeg;base64,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',
                'sort_rank' => 2
              },
              {
                'target_type' => 'ItemText',
                'description' => 'rich text',
                'sort_rank' => 3
              }
            ]
          }

          post_form = Post::Form.new
          expect(post_form.save_from_associations(params)).to be_falsy
          expect(Post.count).to eq 0
          expect(Item.count).to eq 0
          expect(ItemTwitter.count).to eq 0
          expect(ItemText.count).to eq 0
          expect(ItemImage.count).to eq 0
          expect(Tagging.count).to eq 0
          expect(Tag.count).to eq 0
        end

        it 'fails because of lack of items params' do
          params = {
            'title' => 'title',
            'published_at' => Time.current,
            'taggings_attributes' => [{ 'text' => 'name' }],
            'items_attributes' => [
              {
                'target_type' => 'ItemTwitter',
                'sort_rank' => 1
              },
              {
                'target_type' => 'ItemText',
                'sort_rank' => 2
              }
            ]
          }

          post_form = Post::Form.new
          expect(post_form.save_from_associations(params)).to be_falsy
          expect(Post.count).to eq 0
          expect(Item.count).to eq 0
          expect(ItemTwitter.count).to eq 0
          expect(ItemText.count).to eq 0
          expect(Tagging.count).to eq 0
          expect(Tag.count).to eq 0
        end
      end

      context 'when necessary params are sent' do
        it 'increments associated records and returns true' do
          existing_tag = create(:tag)

          params = {
            'title' => 'title',
            'published_at' => Time.current,
            'taggings_attributes' => [
              { 'text' => 'name' },
              { 'text' => existing_tag.name }
            ],
            'items_attributes' => [
              {
                'target_type' => 'ItemTwitter',
                'twitter_id' => '1234',
                'sort_rank' => 1
              },
              {
                'target_type' => 'ItemImage',
                'caption' => 'caption',
                'image' => 'data:image/jpeg;base64,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',
                'sort_rank' => 2
              },
              {
                'target_type' => 'ItemText',
                'description' => 'rich text',
                'sort_rank' => 3
              }
            ]
          }

          post_form = Post::Form.new
          expect(post_form.save_from_associations(params)).to be_truthy
          expect(Post.last.items.size).to eq 3
          expect(ItemText.count).to eq 1
          expect(ItemTwitter.count).to eq 1
          expect(ItemImage.count).to eq 1
          expect(Post.last.taggings.size).to eq 2
          expect(Tag.count).to eq 2
        end
      end
    end

    context 'when updating the record' do
      context 'when necessary params are lack' do
        it 'returns false' do
          post = create(:post)
          create(:item, :twitter, post: post)
          post_form = Post::Form.find(post.id)

          params = {
            'id' => post.id,
            'title' => 'title',
            'published_at' => Time.current,
            'items_attributes' => [
              {
                'target_type' => 'ItemText',
                'sort_rank' => 1
              }
            ]
          }

          expect(post_form.save_from_associations(params)).to be_falsy
          expect(Post.last.items.size).to eq 1
          expect(ItemTwitter.count).to eq 1
          expect(ItemText.count).to eq 0
        end
      end

      context 'when the necessary params are sent' do
        it 'updates the associated record and returns true' do
          post = create(:post)
          create(:item, :twitter, post: post)

          tag1 = create(:tag, name: 'hoge1')
          tag2 = create(:tag, name: 'hoge2')
          tagging1 = create(:tagging, tag: tag1, subject: post)
          create(:tagging, tag: tag2, subject: post)

          post_form = Post::Form.find(post.id)

          params = {
            'id' => post.id,
            'title' => 'title',
            'published_at' => Time.current,
            'taggings_attributes' => [
              { 'id' => tagging1.id, 'text' => tag1.name },
              { 'text' => 'new_tag' }
            ],
            'items_attributes' => [
              {
                'target_type' => 'ItemText',
                'description' => 'rich text',
                'sort_rank' => 1
              }
            ]
          }

          expect(post_form.save_from_associations(params)).to be_truthy
          expect(Post.last.items.size).to eq 1
          expect(Post.last.tags.map(&:name)).to eq [tag1.name, 'new_tag']
          expect(ItemTwitter.count).to eq 0
          expect(ItemText.count).to eq 1
        end
      end
    end
  end

  describe '#delete_unnecessary_items!' do
    context 'when deleting items exist' do
      it 'decrements the item record associated with the record' do
        params = [{ 'id' => 1 }]
        post = create(:post)
        post_form = Post::Form.find(post.id)
        item1 = create(:item, :text, post: post, id: 1)
        create(:item, :image, post: post, id: 2)
        expect { post_form.delete_unnecessary_items!(params) }.to change { Item.count }.by(-1)
          .and change { ItemImage.count }.by(-1)
        expect(Post.find(post.id).items.map(&:id)).to eq [item1.id]
      end
    end

    context 'when deleting items do not exist' do
      it 'decrements the item record associated with the record' do
        params = [{ 'id' => 1 }, { 'id' => 2 }]
        post = create(:post)
        post_form = Post::Form.find(post.id)
        item1 = create(:item, :text, post: post, id: 1)
        item2 = create(:item, :image, post: post, id: 2)
        expect { post_form.delete_unnecessary_items!(params) }.to change { Item.count }.by(0)
        expect(Post.find(post.id).items.map(&:id)).to eq [item1.id, item2.id]
      end
    end
  end
end
