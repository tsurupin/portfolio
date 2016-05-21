class Cms::Api::PostsController < Cms::ApplicationController
  skip_before_action :authenticate_author_from_token!, only: :index
  protect_from_forgery except: %w(create update)

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
      render nothing: true, status: :created
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
      render nothing: true, status: :ok
    else
      render_error(post)
    end
  end

  private

  def post_params
    params.require(:post).permit(*Post::Form::PERMITTED_ATTRIBUTES)
  end

end