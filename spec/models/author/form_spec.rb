# == Schema Information
#
# Table name: authors
#
#  id                 :integer          not null, primary key
#  email              :string(255)      not null
#  encrypted_password :string(255)      not null
#  name               :string(255)      not null
#  image              :string(255)
#  introduction       :text(65535)
#  description        :text(65535)
#  access_token       :string(255)
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#

require 'rails_helper'

RSpec.describe Author::Form, type: :model do
  describe '#validations' do
    it { is_expected.to accept_nested_attributes_for(:items) }
    it { is_expected.to accept_nested_attributes_for(:taggings) }

    context 'description' do
      let(:post) { Author::Form.find(original_post.id) }
      context 'when description is nil' do
        let!(:original_post) { create(:post) }
        it { expect { post.update!(accepted: true) }.to raise_error { ArgumentError } }
      end

      context 'when description is not null' do
        let!(:original_post) { create(:post, description: 'hoge') }
        it { expect { post.update!(accepted: true) }.not_to raise_error { ArgumentError } }
      end
    end
  end

  describe '#save_from_associations' do
    subject { post.save_from_associations(params) }
    let(:product) { create(:product) }

    context 'when new_record' do
      let!(:post) { Author::Form.new }

      let(:item_attributes) do
        [
          {
            'target_type' => 'ItemTwitter',
            'source_url' => 'http://google.com',
            'author_name' => 'hogehoge',
            'author_image_url' => 'http://pbs.twimg.com/profile_images/684791857562304512/v_FCK8fN_normal.jpg',
            'author_screen_name' => 'disney_mickey55',
            'description' => "description",
            'sort_rank' => 1
          },
          {
            'target_type' => 'ItemImage',
            'image' => 'data:image/jpeg;base64,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',
            'sort_rank' => 2
          },
          {
            'target_type' => 'ItemText',
            'description' => 'text',
            'sort_rank' => 3
          },
          {
            'target_type' => 'ItemHeading',
            'title' => 'title',
            'sort_rank' => 4
          },
          {
            'target_type' => 'ItemSubHeading',
            'title' => 'sub title',
            'sort_rank' => 5
          },
          {
            'target_type' => 'ItemLink',
            'source_url' => 'http://google.com',
            'source_title' => 'source',
            'sort_rank' => 6
          },
          {
            'target_type' => 'ItemQuote',
            'source_url' => 'http://google.com',
            'description' => 'description',
            'sort_rank' => 7
          }
        ]
      end

      context 'when failing' do
        shared_examples 'failing to save' do
          it 'fails to save and gets false'  do
            expect(subject).to be_falsey
            expect(Author.count).to eq 0
            expect(Item.count).to eq 0
            expect(ItemTwitter.count).to eq 0
          end
        end
        context 'fails because of lack of post params' do
          let(:params) do
            {
              'published_at' => Time.current,
              'items_attributes' => item_attributes
            }
          end
          it_behaves_like 'failing to save'
        end
        context 'fails because of lack of items params' do
          let(:params) do
            {
              'description' => 'description',
              'published_at' => Time.current,
              'items_attributes' =>
                item_attributes
                  .push('target_type' => 'ItemLink',
                        'source_url' => 'http://google.com')
            }
          end
          it_behaves_like 'failing to save'
        end
      end
      context 'succeeds in saving' do
        let!(:tag) { create(:tag, name: 'hoge') }
        let(:tag_params) do
          [
            { 'text' => 'new_tag' },
            { 'text' => tag.name }
          ]
        end
        let(:params) do
          {
            'title' => 'title',
            'description' => 'description',
            'published_at' => Time.current,
            'items_attributes' => item_attributes,
            'taggings_attributes' => tag_params
          }
        end
        it 'succeeds in saving and gets true' do
          expect(subject).to be_truthy
          expect(Author.last.items.size).to eq 7
          expect(ItemText.count).to eq 1
          expect(ItemTwitter.count).to eq 1
          expect(ItemLink.count).to eq 1
          expect(ItemQuote.count).to eq 1
          expect(ItemHeading.count).to eq 1
          expect(ItemSubHeading.count).to eq 1
          expect(ItemImage.count).to eq 1
          expect(Author.last.taggings.size).to eq 2
          expect(Tag.count).to eq 2
        end
      end
    end

    context 'when persisted record' do
      let!(:original_post) { create(:post) }
      let(:post) { Author::Form.find(original_post.id) }
      let!(:link) { create(:item_link) }
      let!(:item_link) { create(:item, :link, target_id: link.id, post: post, sort_rank: 1) }
      let!(:twitter) { create(:item_twitter) }
      let!(:item_twitter) { create(:item, :twitter, target_id: twitter.id, post: post, sort_rank: 1) }
      let(:item_attributes) do
        [
          {
            'target_type' => 'ItemLink',
            'source_url' => 'http://google.com',
            'source_title' => 'source',
            'sort_rank' => 1
          },
          {
            'id' => item_twitter.id,
            'target_type' => twitter.class.name,
            'target_id' => twitter.id,
            'source_url' => 'http://twitter.com',
            'author_name' => 'hogehoge',
            'author_image_url' => 'http://pbs.twimg.com/profile_images/684791857562304512/v_FCK8fN_normal.jpg',
            'author_screen_name' => 'disney_mickey55',
            'description' => "description",
            'sort_rank' => 2
          }
        ]
      end

      context 'fails because of lack of post params' do
        let(:params) do
          {
            'description' => 'description',
            'published_at' => Time.current,
            'items_attributes' =>
              item_attributes.push('target_type' => 'ItemText')
          }
        end

        it 'fails to save and gets false' do
          expect(subject).to be_falsey
          expect(Author.last.items.size).to eq 2
          expect(Item.where(post_id: post.id, target_type: 'ItemLink').count).to eq 1
          expect(Item.where(post_id: post.id, target_type: 'ItemText').count).to eq 0
          expect(ItemText.count).to eq 0
        end
      end

      context 'when succeeding in saving' do
        let!(:tag1) { create(:tag, name: 'hoge1') }
        let!(:tag2) { create(:tag, name: 'hoge2') }
        let!(:tagging1) { create(:tagging, tag: tag1, subject_id: post.id, subject_type: 'Author') }
        let!(:tagging2) { create(:tagging, tag: tag2, subject_id: post.id, subject_type: "Author") }
        let(:tag_params) do
          [
            { 'id' => tagging1.id, 'text' => tag1.name },
            { 'text' => 'new_tag' }
          ]
        end
        let(:params) do
          {
            'title' => 'title_updated',
            'description' => 'description',
            'published_at' => Time.current,
            'items_attributes' => item_attributes,
            'taggings_attributes' => tag_params
          }
        end
        it 'succeeds in saving and gets true' do
          expect(subject).to be_truthy
          expect(Author.find(post.id).title).to eq 'title_updated'
          expect(Author.last.items.size).to eq 2
          expect(Item.where(post_id: post.id, target_type: 'ItemLink').count).to eq 1
          expect(Item.find(item_twitter.id).sort_rank).to eq 2
          expect(Author.last.taggings.map(&:id)).to eq [tagging1.id, Tagging.where.not(id: tagging2.id).last.id]
          expect(Tag.count).to eq 3
        end
      end
    end
  end


  describe '#delete_unnecessary_items!' do
    let!(:original_post) { create(:post) }
    let(:post) { Author::Form.find(original_post.id) }
    let!(:item) { create(:item, :text, post: post, id: 1) }
    let!(:item) { create(:item, :text, post: post, id: 2) }
    shared_examples 'deleting items' do
      subject { post.delete_unnecessary_items!(params) }
      it { expect { subject }.to change { Item.count }.by(deleted_number) }
    end
    context 'when deleting items exist' do
      let(:params) { [{ 'id' => 1 }] }
      let(:deleted_number) { -1 }
      it_behaves_like 'deleting items'
    end

    context 'when deleting items do not exist' do
      let(:params) { [{ 'id' => 1 }, { 'id' => 2 }] }
      let(:deleted_number) { 0 }
      it_behaves_like 'deleting items'
    end
  end

  describe '#delete_unnecessary_tags!' do
    let!(:original_post) { create(:post) }
    let(:post) { Author::Form.find(original_post.id) }
    let!(:tag1) { create(:tag, name: 'tag1') }
    let!(:tag2) { create(:tag, name: 'tag2') }
    let!(:tagging1) { create(:tagging, subject_id: post.id, subject_type: 'Author', tag: tag1) }
    let!(:tagging2) { create(:tagging, subject_id: post.id, subject_type: 'Author', tag: tag2) }

    shared_examples 'deleting taggings' do
      subject { post.delete_unnecessary_tags!(params) }
      it { expect { subject }.to change { Tagging.count }.by(deleted_number) }
    end
    context 'when deleting taggings exist' do
      let(:params) { [{ 'text' => tag1.name }] }
      let(:deleted_number) { -1 }
      it_behaves_like 'deleting taggings'
    end

    context 'when deleting taggings do not exist' do
      let(:params) { [{ 'text' => tag1.name }, { 'text' => tag2.name }] }
      let(:deleted_number) { 0 }
      it_behaves_like 'deleting taggings'
    end
  end

end
