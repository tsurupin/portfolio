class Client::Api::V1::HomesController < Client::ApplicationController
  def show
    json = rails_cache('cached_home') do
      Client::HomeSerializer.new(Home.new).to_json
    end
    render json: json
  end
end
