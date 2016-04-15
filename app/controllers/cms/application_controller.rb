class Cms::ApplicationController < ApplicationController
  protect_from_forgery with: :null_session

  layout 'cms/layouts/application'

  def home
    render text: nil, layout: true
  end
end
