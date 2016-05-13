class Cms::ApplicationController < ApplicationController
  include AbstractController::Translation
  protect_from_forgery with: :null_session
  before_action :authenticate_author_from_token!, except: :layout
  respond_to :json

  layout 'cms/layouts/application'

  def layout
    render text: nil, layout: true
  end

  protected

  def pagination(page, limit, total)
    { pagination:
        {
          page: page.to_i,
          limit: limit,
          total: total
        }
    }
  end

  def authenticate_author_from_token!
    auth_token = request.headers['Authorization']
    if auth_token
      authenticate_with_auth_token(auth_token)
    else
      authentication_error
    end
  end

  private

  def authenticate_with_auth_token(auth_token)
    return authentication_error unless auth_token.include?(':')

    p auth_token
    author_id = auth_token.split(':').first
    p author_id
    author = Author.find(author_id)

    if author && Devise.secure_compare(author.access_token, auth_token)
      sign_in(author, store: false)
    else
      authenticate_error
    end
  end

  def authentication_error
    render json: { error: t('unauthorized') }, status: 401
  end
end
