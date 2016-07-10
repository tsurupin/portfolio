require 'rails_helper'

RSpec.describe Client::Api::V1::ProjectsController, type: :request do
  describe 'Client Project API' do
    describe 'GET /api/v1/projects' do
      context 'when tag param is not sent' do
        it 'returns correct info' do
          Timecop.freeze(10.days.ago)
          project1 = create(:project, :accepted)
          create(:project)
          create(:tagging, :subject_project, subject: project1)
          Timecop.return
          project3 = create(:project, :accepted)

          create(:tagging, :subject_project, subject: project3)
          projects = [project3, project1]
          result = {
            'projects' => projects.map do |project|
              {
                'id' => project.id,
                'title' => project.title,
                'description' => project.description,
                'image' => project.try(:image_url),
                'caption' => project.try(:caption),
                'sourceUrl' => project.try(:source_url),
                'tags' => project.try(:tags).map { |tag| { 'id' => tag.id, 'name' => tag.name } }
              }
            end
          }

          get api_v1_projects_path
          expect(response.status).to eq 200
          expect(JSON.parse(response.body)).to eq result
        end
      end

      context 'when tag param is sent' do
        it 'returns correct info' do
          Timecop.freeze(10.days.ago)
          project1 = create(:project, :accepted)
          create(:project)
          Timecop.return
          project3 = create(:project, :accepted)
          tagging1 = create(:tagging, :subject_project, subject: project1)
          create(:tagging, :subject_project, subject: project3)
          projects = [project1]
          request_param = { 'tag-id' => tagging1.tag_id }
          result = {
            'projects' => projects.map do |project|
              {
                'id' => project.id,
                'title' => project.title,
                'description' => project.description,
                'image' => project.try(:image_url),
                'caption' => project.try(:caption),
                'sourceUrl' => project.try(:source_url),
                'tags' => project.try(:tags).map { |tag| { 'id' => tag.id, 'name' => tag.name } }
              }
            end
          }

          get(api_v1_projects_path, request_param, {})
          expect(response.status).to eq 200
          expect(JSON.parse(response.body)).to eq result
        end
      end
    end
  end
end
