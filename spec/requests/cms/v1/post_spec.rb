require 'rails_helper'

RSpec.describe Cms::Api::V1::PostsController, type: :request do
  describe 'CMS Post API' do
    let(:author) { create(:author) }
    let(:auth_header) { { 'Authorization' => author.access_token } }

    describe 'GET /cms/api/v1/posts' do
      let!(:post1) { create(:post, :accepted, published_at: Time.current + 1.day) }
      let!(:post2) { create(:post) }
      let!(:tagging1) { create(:tagging, :subject_post, subject: post1) }
      let(:posts) { [post1, post2] }
      context 'when access_token is sent in header' do
        let(:result) do
          {
            'posts' => posts.map.with_index do |post, i|
              {
                'id' => post.id,
                'title' => post.title,
                'accepted' => post.accepted,
                'publishedAt' => post.published_at.try(:strftime, '%b %d, %Y') || '-',
                'status' => [1, 0][i]
              }
            end,
            'meta' => {
              'pagination' => {
                'page' => 0,
                'limit' => 20,
                'total' => 2
              }
            }
          }
        end
        before { get cms_api_v1_posts_path, {}, auth_header }
        it 'returns correct info' do
          expect(response.status).to eq 200
          expect(JSON.parse(response.body)).to eq result
        end
      end

      context 'when access_token is not sent in header' do
        let(:result) { { 'errorMessage' => 'unauthorized' } }
        before { get cms_api_v1_posts_path, {} }
        it 'returns error message' do
          expect(response.status).to eq 401
          expect(JSON.parse(response.body)).to eq result
        end
      end
    end

    describe 'GET /cms/api/v1/posts/new' do
      let!(:tag1) { create(:tag) }
      let!(:tag2) { create(:tag) }
      let(:tags) { [tag1, tag2] }
      let(:result) do
        {
          'id' => nil,
          'title' => nil,
          'accepted' => false,
          'items' => [],
          'leadSentence' => nil,
          'publishedAt' => nil,
          'tagSuggestions' => tags.map(&:name),
          'tags' => []
        }
      end

      before { get new_cms_api_v1_post_path, {}, auth_header }
      it 'return tagSuggestions params' do
        expect(response.status).to eq 200
        expect(JSON.parse(response.body)).to eq result
      end
    end

    describe 'POST /cms/api/v1/posts' do
      let!(:tag) { create(:tag) }
      before { post cms_api_v1_posts_path, params, auth_header }
      context 'the params sent lack of needed params' do
        let!(:params) do
          {
            'post' => {
              'lead_sentence' => 'rich text',
              'items_attributes' => [
                { 'target_type' => 'ItemText', 'description' => 'text' }
              ]
            }
          }
        end
        let(:result) { { 'errorMessage' => "Title can't be blank\nValidation failed: Title can't be blank" } }
        it 'returns 400 and error message' do
          expect(response.status).to eq 400
          expect(JSON.parse(response.body)).to eq result
        end
      end
      context 'needed params are sent' do
        let(:params) do
          {
            'post' => {
              'title' => 'title',
              'lead_sentence' => 'rich text',
              'items_attributes' => [
                { 'target_type' => 'ItemText', 'description' => 'text' }
              ],
              'taggings_attributes' => [{ 'text' => tag.name }]
            }
          }
        end

        it 'returns 201' do
          expect(response.status).to eq 201
          expect(Post.last.title).to eq 'title'
          expect(Post.last.taggings.size).to eq 1
        end
      end
    end

    describe 'GET /cms/api/v1/posts/:id/edit' do
      let!(:post) { create(:post) }
      let!(:tag1) { create(:tag) }
      let!(:tag2) { create(:tag) }
      let!(:tagging) { create(:tagging, :subject_post, subject: post, tag: tag1) }
      let(:tags) { [tag1, tag2] }
      let(:result) do
        {
          'id' => post.id,
          'title' => post.title,
          'accepted' => post.accepted,
          'items' => [],
          'leadSentence' => nil,
          'publishedAt' => nil,
          'tagSuggestions' => tags.map(&:name),
          'tags' => [{ 'id' => tagging.id, 'text' => tagging.name }]
        }
      end

      before { get edit_cms_api_v1_post_path(post.id), {}, auth_header }
      it 'returns tag Suggestions params' do
        expect(response.status).to eq 200
        expect(JSON.parse(response.body)).to eq result
      end
    end

    describe 'PATCH /cms/api/v1/posts/:id' do
      let!(:post) { create(:post) }
      let!(:tag1) { create(:tag, name: 'hoge') }
      let!(:tag2) { create(:tag) }
      let!(:item1) { create(:item, :text, post: post) }
      let!(:item2) { create(:item, :image, post: post) }
      let!(:tagging1) { create(:tagging, :subject_post, subject: post, tag: tag1) }
      let!(:tagging2) { create(:tagging, :subject_post, subject: post, tag: tag2) }

      before { patch cms_api_v1_post_path(post.id), params, auth_header }

      context 'needed params are sent' do
        let(:params) do
          {
            'post' => {
              'title' => 'title',
              'published_at' => Time.current,
              'items_attributes' => [
                {
                  'id' => item1.id,
                  'target_type' => 'ItemText',
                  'description' => item1.target.description
                },
                {
                  'target_type' => 'ItemTwitter',
                  'twitter_id' => '1234'
                }
              ],
              'taggings_attributes' => [
                { 'id' => tagging1.id, 'text' => tagging1.name },
                { 'text' => 'test' }
              ]
            }
          }
        end

        it 'returns 200' do
          expect(response.status).to eq 200
          expect(Post.last.items.map(&:target_type)).to eq %w(text twitter)
          expect(Post.last.taggings.map(&:name)).to eq %w(hoge test)
          expect(ItemImage.count).to eq 0
        end
      end
    end
  end
end
