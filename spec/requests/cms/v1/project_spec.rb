require 'rails_helper'

RSpec.describe Cms::Api::V1::ProjectsController, type: :request do
  describe 'CMS Project API' do
    let(:author) { create(:author) }
    let(:auth_header) { { 'Authorization' => author.access_token } }

    describe 'GET /cms/api/v1/projects' do
      let!(:project1) { create(:project, :accepted) }
      let!(:project2) { create(:project) }
      let!(:tagging1) { create(:tagging, :subject_project, subject: project1) }
      let(:projects) { Project.order(updated_at: :desc) }
      context 'when access_token is sent in header' do
        let(:result) do
          {
            'projects' => projects.map do |project|
              {
                'id' => project.id,
                'title' => project.title,
                'description' => project.description,
                'image' => project.try(:image_url),
                'caption' => project.try(:caption),
                'sourceUrl' => project.try(:source_url),
                'accepted' => project.accepted,
                'tags' => project.try(:tags).map { |tag| { 'id' => tag.id, 'name' => tag.name } }
              }
            end
          }
        end
        before { get cms_api_v1_projects_path, {}, auth_header }
        it 'returns correct info' do
          expect(response.status).to eq 200
          expect(JSON.parse(response.body)).to eq result
        end
      end

      context 'when access_token is not sent in header' do
        let(:result) { { 'errorMessage' => 'unauthorized' } }
        before { get cms_api_v1_projects_path, {} }
        it 'returns error message' do
          expect(response.status).to eq 401
          expect(JSON.parse(response.body)).to eq result
        end
      end
    end

    describe 'GET /cms/api/v1/projects/new' do
      let!(:tag1) { create(:tag) }
      let!(:tag2) { create(:tag) }
      let(:tags) { [tag1, tag2] }
      let(:result) do
        {
          'id' => nil,
          'title' => nil,
          'accepted' => false,
          'description' => nil,
          'sourceUrl' => nil,
          'caption' => nil,
          'image' => nil,
          'tagSuggestions' => tags.map(&:name),
          'tags' => []
        }
      end

      before { get new_cms_api_v1_project_path, {}, auth_header }
      it 'returns tag suggestions params' do
        expect(response.status).to eq 200
        expect(JSON.parse(response.body)).to eq result
      end
    end

    describe 'POST /cms/api/v1/projects' do
      let!(:tag) { create(:tag) }
      before { post cms_api_v1_projects_path, params, auth_header }
      context 'the params sent lack of needed params' do
        let(:params) do
          {
            'project' => {
              'description' => 'description',
              'sourceUrl' => 'http://google.com'
            }
          }
        end
        let(:result) { { 'errorMessage' => "Title can't be blank\nValidation failed: Title can't be blank" } }
        it 'return 400 and error message' do
          expect(response.status).to eq 400
          expect(JSON.parse(response.body)).to eq result
        end
      end
      context 'needed params are sent' do
        let(:params) do
          {
            'project' => {
              'title' => 'title',
              'description' => 'description',
              'image' => 'data:image/jpeg;base64,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',
              'sourceUrl' => 'http://google.com',
              'taggings_attributes' => [{ 'text' => tag.name }]
            }
          }
        end

        it 'return 201' do
          expect(response.status).to eq 201
          expect(Project.last.title).to eq 'title'
          expect(Project.last.taggings.size).to eq 1
        end
      end
    end

    describe 'GET /cms/api/v1/projects/:id/edit' do
      let!(:project) { create(:project) }
      let!(:tag1) { create(:tag) }
      let!(:tag2) { create(:tag) }
      let!(:tagging) { create(:tagging, :subject_project, subject: project, tag: tag1) }
      let(:tags) { [tag1, tag2] }
      let(:result) do
        {
          'id' => project.id,
          'title' => project.title,
          'accepted' => project.accepted,
          'description' => project.description,
          'sourceUrl' => project.source_url,
          'image' => project.image_url,
          'caption' => project.caption,
          'tagSuggestions' => tags.map(&:name),
          'tags' => [{ 'id' => tagging.id, 'text' => tagging.name }]
        }
      end

      before { get edit_cms_api_v1_project_path(project.id), {}, auth_header }
      it 'return tagSuggestions params' do
        expect(response.status).to eq 200
        expect(JSON.parse(response.body)).to eq result
      end
    end

    describe 'PATCH /cms/api/v1/projects/:id' do
      let!(:project) { create(:project) }
      let!(:tag1) { create(:tag, name: 'hoge') }
      let!(:tag2) { create(:tag, name: 'sample') }
      let!(:tagging1) { create(:tagging, :subject_project, subject: project, tag: tag1) }
      let!(:tagging2) { create(:tagging, :subject_project, subject: project, tag: tag2) }
      before { patch cms_api_v1_project_path(project.id), params, auth_header }

      context 'needed params are sent' do
        let(:params) do
          {
            'project' => {
              'title' => 'title',
              'description' => 'description',
              'image' => Faker::Avatar.image,
              'sourceUrl' => 'http://google.com',
              'taggings_attributes' => [
                { 'id' => tagging1.id, 'text' => tag1.name },
                { 'text' => 'test' }
              ]
            }
          }
        end

        it 'return 200' do
          expect(response.status).to eq 200
          expect(Project.last.taggings.map(&:name)).to eq %w(hoge test)
        end
      end
    end
  end
end
