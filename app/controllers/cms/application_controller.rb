class Cms::ApplicationController < ApplicationController

  layout 'cms/layouts/application'

  def layout
    render text: nil, layout: true
  end

end
