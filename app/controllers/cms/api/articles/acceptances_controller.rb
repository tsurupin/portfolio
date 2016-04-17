class Cms::Api::Articles::AcceptancesController < Cms::ApplicationController
  before_action :set_article

  def update
    status = @article.toggle!(:accepted) ? 200 : 500
    render json: { status: status }
  end

  def set_article
    @article = Article.find(params[:article_id])
  end

end