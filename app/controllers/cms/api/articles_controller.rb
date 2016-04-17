class Cms::Api::ArticlesController < Cms::ApplicationController

  def index
    @articles = [{title: 'hoge', description: 'description', id: 1}]
    render json: @articles
  end
end