class Client::Api::V1::PostsController < Client::ApplicationController

  def index
    posts = Post.order(updated_at: :desc).page(params[:page])
    render json: posts, each_serializer: PostsSerializer
  end

  def show
    post = Post.find(params[:id])
    render json: post
  end
end