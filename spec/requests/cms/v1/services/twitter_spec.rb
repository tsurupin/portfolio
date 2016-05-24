require 'rails_helper'
require 'webmock/rspec'

RSpec.describe Cms::Api::V1::Services::TwittersController, type: :request do
  describe 'CMS Twitter API' do

    describe 'GET /cms/api/v1/services/twitter' do
      subject { JSON.parse(response.body) }
      let(:sort_rank) { '1' }
      context 'when the url exists' do
        let(:url) { 'https://twitter.com/sgblank/status/719359456161607681' }
        let(:result) do
          {
            'attributes' => {
              'sourceUrl' => url,
              'authorImageUrl' => 'http://pbs.twimg.com/profile_images/658353847597838336/gudlMh3p_normal.jpg',
              'authorName' => 'steve blank',
              'authorScreenName' => 'sgblank',
              'description' => 'Great professors are people who wish to remain students for the rest of their lives.',
            }
          }
        end
        before { get cms_api_v1_services_twitter_path, url: url }
        it 'return correct info from api' do
          VCR.use_cassette 'twitter_cms_api_service_success' do
            expect(subject).to eq result
            expect(response.status).to eq 200
          end
        end
      end

      context 'when the url does not exist' do
        let(:url) { 'https://twitter.com/disney_mickey55/status/' }
        before { get cms_api_v1_services_twitter_path, url: url }
        it 'return error message' do
          VCR.use_cassette 'twitter_cms_api_service_error' do
            expect(response.status).to eq 400
          end
        end
      end
    end
  end
end
