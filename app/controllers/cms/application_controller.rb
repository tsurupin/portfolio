class Cms::ApplicationController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :configure_permitted_parameters, if: :devise_controller?

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

end
