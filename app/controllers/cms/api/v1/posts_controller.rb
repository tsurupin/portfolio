class Cms::Api::V1::PostsController < Cms::ApplicationController
  skip_before_action :authenticate_author_from_token!, only: :index

  def index
    posts = Post.page(params[:page])
    render json: posts, each_serializer: PostsSerializer,
           meta: pagination(params[:page], Post::PAGINATES_PER, posts.total_count)
  end

  def new
    post = Post.new
    render json: post, root: false
  end

  def create
    post = Post::Form.new
    if post.save_from_associations(post_params)
      head :created
    else
      render_error(post)
    end
  end

  def edit
    post = Post.find(params[:id])
    render json: post, root: false
  end

  def update
    post = Post::Form.find(params[:id])
    if post.save_from_associations(post_params)
      head :ok
    else
      render_error(post)
    end
  end

  private

  def post_params
    params.require(:post).permit(*Post::Form::PERMITTED_ATTRIBUTES)
  end

end