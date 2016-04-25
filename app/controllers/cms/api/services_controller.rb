class Cms::Api::ServicesController < Cms::ApplicationController

  def html
    service_render('html', params[:url], params[:sort_rank])
  end

  def twitter
    service_render('twitter', params[:url], params[:sort_rank])
  end


  private

  def service_render(type, url, sort_rank)
    service = case type
              when 'html' then HTMLService.new(url)
              when 'twitter' then TwitterService.new(url)
              end

    is_accessible = service.receive

    render json: {
      sortRank: sort_rank,
      responseParams: {
        sourceURL: url,
        authorImageURL: service.response_params[:author_image_url],
        authorName: service.response_params[:author_name],
        authorScreenName: service.response_params[:author_screen_name],
        description: service.response_params[:description],
        isAccessible: is_accessible,
        errorMessage: service.response_params[:error_message]
      }
    }
  end
end
