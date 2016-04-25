require 'rails_helper'
require 'webmock/rspec'

RSpec.describe TwitterService, type: :service do
  describe '#receive' do
    let(:twitter) { TwitterService.new(url) }
    let(:response_params) { twitter.response_params }
    context 'when the url exists' do
      let(:url) { 'https://twitter.com/sgblank/status/719359456161607681' }
      it 'return right info from api' do
        VCR.use_cassette 'twitter_service' do
          expect(twitter.receive!).to be_truthy
          expect(response_params[:author_image_url]).to eq 'http://pbs.twimg.com/profile_images/658353847597838336/gudlMh3p_normal.jpg'
          expect(response_params[:author_name]).to eq 'steve blank'
          expect(response_params[:author_screen_name]).to eq 'sgblank'
          expect(response_params[:description]).to eq 'Great professors are people who wish to remain students for the rest of their lives.'
        end
      end
    end

    context 'when the url does not exist' do
      let(:url) { 'https://www.twitter.com/p' }
      it 'return error message' do
        VCR.use_cassette 'twitter_service_with_error' do
          expect(twitter.receive!).to be_falsey
          expect(response_params[:error_message]).to eq 'Cannot retrieve info from this url'
        end
      end
    end
  end
end
