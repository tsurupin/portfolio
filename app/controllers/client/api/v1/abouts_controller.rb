class Client::Api::V1::AboutsController < Client::ApplicationController
  def show
    author = rails_cache("cached_author") do
      Author.eager_load(:social_accounts).first
    end

    render json: Client::AboutSerializer.new(author)
  end
end