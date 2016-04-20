class Cms::Api::PostsController < Cms::ApplicationController

  def index
    @posts = [{title: 'hoge', description: 'description', id: 1}]
    render json: @posts
  end
end