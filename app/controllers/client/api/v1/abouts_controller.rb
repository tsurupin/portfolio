class Client::Api::V1::AboutsController < Client::ApplicationController
  def show
    author = Auhor.new
    render json: author
  end
end