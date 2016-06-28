require 'rails_helper'

RSpec.describe Client::Api::V1::AboutsController, type: :request do
  describe 'Client About API' do
    describe 'GET /api/v1/about' do
      let!(:author) { create(:author, description: 'rich text', introduction: 'rich text') }
      let!(:sa_github) { create(:social_account, author: author, account_type: 'git_hub') }
      let(:social_accounts) { [sa_github] }
      context 'when access_token is sent in header' do
        let(:result) do
          {
            'image' => author.image_url,
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
        before { get api_v1_about_path }
        it 'returns the correct info' do
          expect(response.status).to eq 200
          expect(JSON.parse(response.body)).to eq result
        end
      end
    end
  end
end
