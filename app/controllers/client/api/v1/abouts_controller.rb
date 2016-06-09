class Client::Api::V1::AboutsController < Client::ApplicationController
  def show
    author = Author.last
    render json: AboutSerializer.new(author)
  end
end