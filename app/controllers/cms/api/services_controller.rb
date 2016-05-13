class Cms::Api::ServicesController < Cms::ApplicationController
  skip_before_action :authenticate_author_from_token!

  def twitter
    service_render(params[:url], params[:sort_rank])
  end

  private

  def service_render(url, sort_rank)
    service = TwitterService.new(url)

    if service.receive!
      render json: {
        sortRank: sort_rank,
        responseParams: {
          sourceURL: url,
          authorImageURL: service.response_params[:author_image_url],
          authorName: service.response_params[:author_name],
          authorScreenName: service.response_params[:author_screen_name],
          description: service.response_params[:description],
        }
      }
    else
      render nothing: true, status: 400
    end
  end
end
