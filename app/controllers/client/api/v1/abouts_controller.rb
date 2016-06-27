class Client::Api::V1::AboutsController < Client::ApplicationController
  def show
    json = rails_cache('cached_author') do
      author = Author.eager_load(:social_accounts).first
      Client::AboutSerializer.new(author)
    end

    render json: json
  end
end
