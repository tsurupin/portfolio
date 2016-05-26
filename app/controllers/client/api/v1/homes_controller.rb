class Client::Api::V1::HomesController < Client::ApplicationController
  def show
    home = Home.new
    render json: home
  end
end