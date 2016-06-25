require 'rails_helper'

RSpec.describe Client::Api::V1::HomesController, type: :request do
  describe 'Client Home API' do
    describe 'GET /api/v1/about' do
      let!(:author) { create(:author, description: 'rich text', introduction: 'rich text') }
      let!(:post1) { create(:post, :accepted) }
      let!(:post2) { create(:post, :accepted) }
      let!(:post3) { create(:post, :accepted) }
      let!(:post4) { create(:post, :accepted, published_at: 7.days.ago) }
      let!(:latest_posts) { [post1, post2, post3] }
      let!(:latest_project) { create(:project, :accepted) }
      context 'when access_token is sent in header' do
        let(:result) do
          {
            'introduction' => author.introduction,
            'latestPosts' => latest_posts.map do |post|
              {
                'id' => post.id,
                'title' => post.title,
                'leadSentence' => post.lead_sentence
              }
            end,
            'latestProject' => {
              'id' => latest_project.id,
              'title' => latest_project.title,
              'image' => latest_project.image_url
            }
          }
        end
        before { get api_v1_home_path }
        it 'returns the correct info' do
          expect(response.status).to eq 200
          expect(JSON.parse(response.body)).to eq result
        end
      end
    end
  end
end
