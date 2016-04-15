class Cms::Api::ArticlesController < Cms::ApplicationController
  def index
    @articles = Article.all
    render json: @articles
  end
end