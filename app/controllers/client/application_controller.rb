class Client::ApplicationController < ApplicationController

  layout 'client/layouts/application'

  respond_to :json

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

end
