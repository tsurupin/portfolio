class Cms::Api::V1::Services::TwittersController < Cms::ApplicationController
  skip_before_action :authenticate_author_from_token!

  def show
    service = TwitterService.new(params[:url])

    if service.receive!
      twitter = ItemTwitter.new(service.response_params)
      render json: twitter, root: 'attributes'
    else
      head :bad_request
    end
  end

end
