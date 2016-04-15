class Cms::ApplicationController < ApplicationController
  layout 'cms/layouts/application'

  def home
    render text: nil, layout: true
  end
end
