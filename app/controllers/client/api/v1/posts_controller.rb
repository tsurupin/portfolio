class Client::Api::V1::PostsController < Client::ApplicationController

  def index
    posts = Post.accepted.order(updated_at: :desc).page(params[:page])
    render json: posts, each_serializer: PostsSerializer,
           meta: pagination(params[:page], Post::PAGINATES_PER, posts.total_count)
  end

  def show
    post = Post.find(params[:id])
    render json: post
  end
end