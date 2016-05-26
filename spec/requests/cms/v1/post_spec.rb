require 'rails_helper'

RSpec.describe Cms::Api::V1::PostsController, type: :request do
  describe 'CMS Post API' do
    let(:author) { create(:author) }
    let(:auth_header) { { 'Authorization' => author.access_token } }

    describe 'GET /cms/api/v1/posts' do
      subject { JSON.parse(response.body) }
      let!(:post1) { create(:post, :accepted, published_at: Time.current + 1.days) }
      let!(:post2) { create(:post) }
      let!(:tagging1) { create(:tagging, subject_id: post1.id, subject_type: "Post") }
      let(:posts) { Post.order(updated_at: :desc) }
      context 'when access_token is sent in header' do
        let(:result) do
          {
            'posts' => posts.map.with_index do |post, i|
              {
                'id' => post.id,
                'title' => post.title,
                'accepted' => post.accepted,
                'publishedAt' => post.published_at.try(:strftime, '%d-%m, %H:%M') || 'not publishing yet',
                'status' => ['will publish', 'not accepted'][i]
              }
            end,
            "meta" => {
              "pagination" => {
                "page" => 0,
                "limit" => 20,
                "total" =>2
              }
            },
          }
        end
        before { get cms_api_v1_posts_path, {}, auth_header }
        it 'returns correct info from api' do
          expect(response.status).to eq 200
          expect(subject).to eq result
        end
      end

      context 'when access_token is not sent in header' do
        before { get cms_api_v1_posts_path, {} }
        it 'returns error message' do
          expect(response.status).to eq 401
        end
      end
    end

    describe 'GET /cms/api/v1/posts/new' do
      subject { JSON.parse(response.body) }
      let!(:tag1) { create(:tag) }
      let!(:tag2) { create(:tag) }
      let(:tags) { [tag1, tag2] }
      let(:result) do
        {
          'id' => nil,
          'title' => nil,
          'accepted' => false,
          'items' => [],
          'publishedAt' => 'not publishing yet',
          'tagSuggestions' => tags.map(&:name),
          'tags' => []
        }
      end

      before { get new_cms_api_v1_post_path, {}, auth_header }
      it 'return tagSuggestions params' do
        expect(response.status).to eq 200
        expect(subject).to eq result
      end
    end

    describe 'POST /cms/api/v1/posts' do
      let!(:tag) { create(:tag) }
      before { post cms_api_v1_posts_path, params, auth_header }
      context 'the params sent lack of needed params' do
        subject { JSON.parse(response.body) }
        let(:params) do
          {
            'post' => {
              'description' => 'description'
            }
          }
        end
        let(:result) { { "errorMessage" => "Title can't be blankValidation failed: Title can't be blank" } }
        it 'return 400 and error message' do
          expect(response.status).to eq 400
          expect(subject).to eq result
        end
      end
      context 'needed params are sent' do
        let(:params) do
          {
            'post' => {
              'title' => 'title',
              'taggings_attributes' => [ { 'text' => tag.name } ]
            }
          }
        end

        it 'return 201' do
          expect(response.status).to eq 201
          expect(Post.last.title).to eq 'title'
          expect(Post.last.taggings.size).to eq 1
        end
      end
    end

    describe 'GET /cms/api/v1/posts/:id/edit' do
      subject { JSON.parse(response.body) }
      let!(:post) { create(:post) }
      let!(:tag1) { create(:tag) }
      let!(:tag2) { create(:tag) }
      let!(:tagging) { create(:tagging, :subject_post, subject_id: post.id, tag: tag1)}
      let(:tags) { [tag1, tag2,] }
      let(:result) do
        {
          'id' => post.id,
          'title' => post.title,
          'accepted' => post.accepted,
          'items' => [],
          'publishedAt' => 'not publishing yet',
          'tagSuggestions' => tags.map(&:name),
          'tags' => [{ 'id' => tagging.id, 'text' => tagging.name }]
        }
      end

      before { get edit_cms_api_v1_post_path(post.id), {}, auth_header }
      it 'return tag Suggestions params' do
        expect(response.status).to eq 200
        expect(subject).to eq result
      end
    end

    describe 'PATCH /cms/api/v1/posts/:id' do
      let!(:post) { create(:post) }
      let!(:tag1) { create(:tag, name: 'hoge') }
      let!(:tag2) { create(:tag) }
      let!(:item1) { create(:item, :heading, post: post)}
      let!(:item2) { create(:item, :sub_heading, post: post)}
      let!(:tagging1) { create(:tagging, :subject_post, subject_id: post.id, tag: tag1) }
      let!(:tagging2) { create(:tagging, :subject_post, subject_id: post.id, tag: tag2) }

      before { patch cms_api_v1_post_path(post.id), params, auth_header }

      context 'needed params are sent' do
        let(:params) do
          {
            'post' => {
              'title' => 'title',
              'description' => 'description',
              'published_at' => Time.current,
              'items_attributes' => [
                { 'id' => item1.id, 'target_type' => 'ItemHeading', 'target_id' => item1.target_id, 'title' => item1.target.title },
                { 'target_type' => 'ItemText', 'description' => 'hogehoge' }
              ],
              'taggings_attributes' => [
                { 'id' => tagging1.id, 'text' => tagging1.name },
                { 'text' => 'test' }
              ]
            }
          }
        end

        it 'return 200' do
          expect(response.status).to eq 200
          expect(Post.last.items.map(&:target_type)).to eq ['heading', 'text']
          expect(Post.last.taggings.map(&:name)).to eq ['hoge','test']
          expect(ItemSubHeading.count).to eq 0
        end
      end
    end
  end
end
