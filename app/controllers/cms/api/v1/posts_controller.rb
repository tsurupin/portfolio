class Cms::Api::V1::PostsController < Cms::ApplicationController
  def index
    posts = Post.page(params[:page])
    render json: posts, each_serializer: PostsSerializer,
           meta: pagination(params[:page], Post::PAGINATES_PER, posts.total_count)
  end

  def new
    post = Post.new
    render json: PostFormSerializer.new(post)
  end

  def create
    post = Post::Form.new
    if post.save_from_associations(post_params)
      head :created
    else
      render_error_message(post)
    end
  end

  def edit
    post = Post.find(params[:id])
    render json: PostFormSerializer.new(post)
  end

  def update
    post = Post::Form.find(params[:id])
    if post.save_from_associations(post_params)
      head :ok
    else
      render_error_message(post)
    end
  end

  private

  def post_params
    params.require(:post).permit(*Post::Form::PERMITTED_ATTRIBUTES)
  end

end