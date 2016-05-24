require 'rails_helper'

RSpec.describe Cms::Api::V1::Posts::AcceptancesController, type: :request do
  describe 'CMS Post API' do
    let(:author) { create(:author) }
    let(:auth_header) { { 'Authorization' => author.access_token } }

    describe 'PATCH /cms/api/v1/posts/:id/acceptance' do
      before { patch cms_api_v1_post_acceptance_path(post.id), {}, auth_header }
      context 'when post was accepted' do
        let!(:post) { create(:post, :accepted) }
        it 'changes accepted from true to false' do
          expect(response.status).to eq 200
          expect(Post.find(post.id).accepted).to be_falsey
        end
      end

      context 'when the post was not accepted' do
        let!(:post) { create(:post, :accepted, accepted: false) }
        it 'changes accepted from false to true' do
          expect(response.status).to eq 200
          expect(Post.find(post.id).accepted).to be_truthy
        end
      end

    end
  end
end
