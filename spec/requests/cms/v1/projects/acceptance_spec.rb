require 'rails_helper'

RSpec.describe Cms::Api::V1::Projects::AcceptancesController, type: :request do
  describe 'CMS Project API' do
    let(:author) { create(:author) }
    let(:auth_header) { { 'Authorization' => author.access_token } }

    describe 'PATCH /cms/api/v1/projects/:id/acceptance' do
      before { patch cms_api_v1_project_acceptance_path(project.id), {}, auth_header }
      context 'when project was accepted' do
        let!(:project) { create(:project, :accepted) }
        let(:result) { { 'accepted' => false } }
        it 'changes accepted from true to false' do
          expect(response.status).to eq 200
          expect(JSON.parse(response.body)).to eq result
        end
      end

      context 'when the project was not accepted' do
        let!(:project) { create(:project, :accepted, accepted: false) }
        let(:result) { { 'accepted' => true } }
        it 'changes accepted from false to true' do
          expect(response.status).to eq 200
          expect(JSON.parse(response.body)).to eq result
        end

        context 'when the post lacks of necessary data to accept' do
          let!(:project) { create(:project, description: 'rich text', source_url: 'http://google.com') }
          let(:result) { { 'errorMessage' => "Image can't be blank" } }
          it 'returns an error message' do
            expect(response.status).to eq 400
            expect(JSON.parse(response.body)).to eq result
          end
        end
      end
    end
  end
end
