class Client::Api::V1::AboutsController < Client::ApplicationController
  def show
    about = About.new
    render json: about
  end
end