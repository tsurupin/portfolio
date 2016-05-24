require 'rails_helper'

RSpec.describe Cms::Api::AuthorsController, type: :request do
  describe 'CMS Author API' do
    let(:auth_header) { { 'Authorization' => author.access_token } }

    describe 'GET /cms/api/authors' do
      subject { JSON.parse(response.body) }
      let!(:author) { create(:author) }
      let!(:sa_twitter) { create(:social_account, author: author, account_type: 'twitter') }
      let!(:sa_linked_in) { author.social_accounts.new(account_type: 'linked_in') }
      let!(:sa_github) { author.social_accounts.new(account_type: 'github') }
      let!(:sa_facebook) { author.social_accounts.new(account_type: 'facebook') }
      let(:social_accounts) { [sa_github, sa_facebook, sa_twitter, sa_linked_in] }
      context 'when access_token is sent in header' do
        let(:result) do
          {
            'name' => author.name,
            'image' => author.image_url,
            'email' => author.email,
            'description' => author.description,
            'socialAccounts' => social_accounts.map do |social_account|
              {
                 'id' => social_account.id,
                 'authorId' => social_account.author_id,
                 'accountType' => social_account.account_type,
                 'url' => social_account.url
               }
            end
          }
        end
        before { get cms_api_authors_path, {}, auth_header }
        it 'return correct info from api' do
          expect(response.status).to eq 200
          expect(subject).to eq result
        end
      end

      context 'when access_token is not sent in header' do
        before { get cms_api_authors_path, {} }
        it 'return error message' do
          expect(response.status).to eq 401
        end
      end
    end

    # describe 'GET /cms/api/authors/new' do
    #   subject { JSON.parse(response.body) }
    #   let!(:tag1) { create(:tag) }
    #   let!(:tag2) { create(:tag) }
    #   let(:tags) { [tag1, tag2,] }
    #   let(:result) do
    #     {
    #       'id' => nil,
    #       'title' =>nil,
    #       'accepted' => false,
    #       'description' => nil,
    #       'sourceUrl' => nil,
    #       'sampleUrl' => nil,
    #       'image' => nil,
    #       'tagSuggestions' => tags.map(&:name),
    #       'tags' => []
    #     }
    #   end
    #
    #   before { get new_cms_api_author_path, {}, auth_header }
    #   it 'return tagSuggestions params' do
    #     expect(response.status).to eq 200
    #     expect(subject).to eq result
    #   end
    # end
    #
    # describe 'POST /cms/api/authors' do
    #   let!(:tag) { create(:tag) }
    #   before { post cms_api_authors_path, params, auth_header }
    #   context 'the params sent lack of needed params' do
    #     subject { JSON.parse(response.body) }
    #     let(:params) do
    #       {
    #         'author' => {
    #           'description' => 'description',
    #           'source_url' => 'http://google.com',
    #           'sample_url' => 'http://google.com'
    #         }
    #       }
    #     end
    #     let(:result) { { "errorMessage" => "Title can't be blankValidation failed: Title can't be blank" } }
    #     it 'return 400 and error message' do
    #       expect(response.status).to eq 400
    #       expect(subject).to eq result
    #     end
    #   end
    #   context 'needed params are sent' do
    #     let(:params) do
    #       {
    #         'author' => {
    #           'title' => 'title',
    #           'description' => 'description',
    #           'image' => 'data:image/jpeg;base64,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',
    #           'source_url' => 'http://google.com',
    #           'sample_url' => 'http://google.com',
    #           'taggings_attributes' => [ { 'text' => tag.name } ]
    #         }
    #       }
    #     end
    #
    #     it 'return 201' do
    #       expect(response.status).to eq 201
    #       expect(Author.last.title).to eq 'title'
    #       expect(Author.last.taggings.size).to eq 1
    #     end
    #   end
    # end
    #
    # describe 'GET /cms/api/authors/:id/edit' do
    #   subject { JSON.parse(response.body) }
    #   let!(:author) { create(:author) }
    #   let!(:tag1) { create(:tag) }
    #   let!(:tag2) { create(:tag) }
    #   let!(:tagging) { create(:tagging, :subject_author, subject_id: author.id, tag: tag1)}
    #   let(:tags) { [tag1, tag2,] }
    #   let(:result) do
    #     {
    #       'id' => author.id,
    #       'title' => author.title,
    #       'accepted' => author.accepted,
    #       'description' => author.description,
    #       'sourceUrl' => author.source_url,
    #       'sampleUrl' => author.sample_url,
    #       'image' => author.image_url,
    #       'tagSuggestions' => tags.map(&:name),
    #       'tags' => [{ 'id' => tagging.id, 'text' => tagging.name }]
    #     }
    #   end
    #
    #   before { get edit_cms_api_author_path(author.id), {}, auth_header }
    #   it 'return tagSuggestions params' do
    #     expect(response.status).to eq 200
    #     expect(subject).to eq result
    #   end
    # end
    #
    # describe 'PATCH /cms/api/authors/:id' do
    #   let!(:author) { create(:author) }
    #   let!(:tag1) { create(:tag, name: 'hoge') }
    #   let!(:tag2) { create(:tag) }
    #   let!(:tagging1) { create(:tagging, :subject_author, subject_id: author.id, tag: tag1) }
    #   let!(:tagging2) { create(:tagging, :subject_author, subject_id: author.id, tag: tag2) }
    #   before { patch cms_api_author_path(author.id), params, auth_header }
    #   # TODO: think of error case
    #   # context 'the params sent lack of needed params' do
    #   #   subject { JSON.parse(response.body) }
    #   #   let(:params) do
    #   #     {
    #   #       'author' => {
    #   #         'description' => nil,
    #   #         'source_url' => 'http://google.com',
    #   #         'sample_url' => 'http://google.com',
    #   #         'taggings_attributes' => [ { 'text' => 'test' } ]
    #   #       }
    #   #     }
    #   #   end
    #   #   before { patch cms_api_author_path(author.id), params, auth_header }
    #   #   it 'return 400 and error message' do
    #   #     expect(response.status).to eq 400
    #   #     expect(Tagging.exists?(subject_id: author.id)).to be_truthy
    #   #   end
    #   # end
    #   context 'needed params are sent' do
    #     let(:params) do
    #       {
    #         'author' => {
    #           'title' => 'title',
    #           'description' => 'description',
    #           'image' => Faker::Avatar.image,
    #           'source_url' => 'http://google.com',
    #           'sample_url' => 'http://google.com',
    #           'taggings_attributes' => [
    #             { 'id' => tag1.id, 'text' => tag1.name },
    #             { 'text' => 'test' }
    #           ]
    #         }
    #       }
    #     end
    #
    #     it 'return 200' do
    #       expect(response.status).to eq 200
    #       expect(Author.last.taggings.map(&:name)).to eq ['hoge','test']
    #     end
    #   end
    # end
  end
end
