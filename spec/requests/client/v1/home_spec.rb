require 'rails_helper'

RSpec.describe Client::Api::V1::HomesController, type: :request do
  describe 'Client Home API' do
    describe 'GET /api/v1/about' do
      context 'when access_token is sent in header' do
        it 'returns the correct info' do
          author = create(:author, description: 'rich text', introduction: 'rich text')
          latest_posts = []
          4.times do |i|
            latest_posts << create(:post, :accepted, published_at: i.days.ago)
          end

          latest_project = create(:project, :accepted)
          result = {
              'introduction' => author.introduction,
              'latestPosts' => latest_posts[0..2].map do |post|
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
          get api_v1_home_path

          expect(response.status).to eq 200
          expect(JSON.parse(response.body)).to eq result
        end
      end
    end
  end
end
