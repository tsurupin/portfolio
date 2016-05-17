class Cms::Api::ServicesController < Cms::ApplicationController
  skip_before_action :authenticate_author_from_token!

  def twitter
    service_render(params[:url])
  end

  private

  def service_render(url)
    service = TwitterService.new(url)

    if service.receive!
      twitter = ItemTwitter.new(service.response_params)
      render json: twitter, root: 'attributes'
    else
      render nothing: true, status: :bad_request
    end
  end
end
