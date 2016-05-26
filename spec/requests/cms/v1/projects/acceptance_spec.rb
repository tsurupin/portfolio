require 'rails_helper'

RSpec.describe Cms::Api::V1::Projects::AcceptancesController, type: :request do
  describe 'CMS Project API' do
    let(:author) { create(:author) }
    let(:auth_header) { { 'Authorization' => author.access_token } }

    describe 'PATCH /cms/api/v1/projects/:id/acceptance' do
      before { patch cms_api_v1_project_acceptance_path(project.id), {}, auth_header }
      context 'when project was accepted' do
        let!(:project) { create(:project, :accepted) }
        it 'changes accepted from true to false' do
          expect(response.status).to eq 200
          expect(Project.find(project.id).accepted).to be_falsey
        end
      end

      context 'when the project was not accepted' do
        let!(:project) { create(:project, :accepted, accepted: false) }
        it 'changes accepted from false to true' do
          expect(response.status).to eq 200
          expect(Project.find(project.id).accepted).to be_truthy
        end
      end
    end
  end
end
