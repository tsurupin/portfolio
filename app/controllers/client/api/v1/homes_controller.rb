class Client::Api::V1::HomesController < Client::ApplicationController
  def show
    home = rails_cache('cached_home') do
      Home.new
    end
    render json: Client::HomeSerializer.new(home)
  end
end
