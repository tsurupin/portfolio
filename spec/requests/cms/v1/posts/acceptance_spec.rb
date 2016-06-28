require 'rails_helper'

RSpec.describe Cms::Api::V1::Posts::AcceptancesController, type: :request do
  describe 'CMS Post API' do
    let(:author) { create(:author) }
    let(:auth_header) { { 'Authorization' => author.access_token } }

    describe 'PATCH /cms/api/v1/posts/:id/acceptance' do
      before { patch cms_api_v1_post_acceptance_path(post.id), {}, auth_header }
      context 'when post was accepted' do
        let!(:post) { create(:post, :accepted) }
        let(:result) { { 'accepted' => false, 'status' => 0 } }
        it 'changes accepted from true to false' do
          expect(response.status).to eq 200
          expect(JSON.parse(response.body)).to eq result
        end
      end

      context 'when the post was not accepted' do
        let!(:post) { create(:post, :accepted, accepted: false) }
        let(:result) { { 'accepted' => true, 'status' => 2 } }
        it 'changes accepted from false to true' do
          expect(response.status).to eq 200
          expect(JSON.parse(response.body)).to eq result
        end

        context 'when the post lacks of necessary data to accept' do
          let!(:post) { create(:post) }
          let(:result) { { 'errorMessage' => "Published at can't be blank" } }
          it 'returns an error message' do
            expect(response.status).to eq 400
            expect(JSON.parse(response.body)).to eq result
          end
        end
      end
    end
  end
end
