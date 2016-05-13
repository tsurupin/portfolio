require 'rails_helper'

RSpec.describe Cms::Api::ProjectsController, type: :request do
  describe 'CMS Project API' do
    let(:author) { create(:author) }
    let(:auth_header) { { 'Authorization' => author.access_token } }

    describe 'GET /cms/api/projects' do
      subject { JSON.parse(response.body) }
      let!(:project1) { create(:project, :accepted) }
      let!(:project2) { create(:project) }
      let!(:project_tagging1) { create(:project_tagging, project: project1) }
      let(:projects) { Project.order(updated_at: :desc) }
      context 'when access_token is sent in header' do
        let(:result) do
          {
            'projects' => projects.map do |project|
              {
                'id' => project.id,
                'title' => project.title,
                'description' => project.description,
                'imageURL' => project.try(:image_url),
                'sourceURL' => project.try(:source_url),
                'sampleURL' => project.try(:sample_url),
                'accepted' => project.accepted,
                'projectTags' => project.try(:project_tags).map(&:name)
              }
            end
          }
        end
        before { get cms_api_projects_path, {}, auth_header }
        it 'return correct info from api' do
          expect(response.status).to eq 200
          expect(subject).to eq result
        end
      end

      context 'when access_token is not sent in header' do
        before { get cms_api_projects_path, {} }
        it 'return error message' do
          expect(response.status).to eq 401
        end
      end
    end
  end
end
