class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception
  protect_from_forgery with: :null_session

  respond_to :json

  def health_check
    render text:  'ok', status: :ok
  end

  def layout
    render text: nil, layout: true
  end

  def pagination(page, limit, total)
    { pagination:
        {
          page: page.to_i,
          limit: limit,
          total: total
        }
    }
  end

  protected

  def render_error_message(model)
    logger.error model.errors.full_messages.join('')
    p model.errors.full_messages.join('')
    render json: { errorMessage: model.errors.full_messages.join('') }, status: :bad_request
  end

end
