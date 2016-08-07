require 'rails_helper'

RSpec.describe Cms::Api::V1::Authors::SessionsController, type: :request do
  describe 'CMS Session API' do
    let!(:author) { create(:author, email: 'sample@gmail.com', password: 'sampletest') }
    describe 'POST /cms/api/v1/authors/sign-in' do
      subject { JSON.parse(response.body) }
      before { post cms_api_v1_author_session_path, params }
      context 'when params are invalid' do
        let(:result) { { 'errorMessage' => 'Invalid email or password.' } }
        context 'when email is wrong' do
          let(:params) do
            {
              'author' => {
                'email' => 'wrong@gmail.com',
                'password' => 'sampletest'
              }
            }
          end
          it 'returns error message' do
            expect(response.status).to eq 401
            expect(subject).to eq result
          end
        end

        context 'when password is wrong' do
          let(:params) do
            {
              'author' => {
                'email' => 'sample@gmail.com',
                'password' => 'wrong'
              }
            }
          end
          it 'returns error message' do
            expect(response.status).to eq 401
            expect(subject).to eq result
          end
        end
      end

      context 'when params are valid' do
        let(:params) do
          {
            'author' => {
              'email' => 'sample@gmail.com',
              'password' => 'sampletest'
            }
          }
        end
        let(:result) { { 'accessToken' => author.access_token } }
        it 'returns access token' do
          expect(response.status).to eq 200
          expect(subject).to eq result
        end
      end
    end

    describe 'DELETE /cms/api/v1/authors/sign-out' do
      before { delete destroy_cms_api_v1_author_session_path, {} }
      it 'returns status code 200' do
        expect(response.status).to eq 200
      end
    end
  end
end
