class Cms::ApplicationController < ApplicationController

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
