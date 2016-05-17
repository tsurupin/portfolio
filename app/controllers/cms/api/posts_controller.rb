class Cms::Api::PostsController < Cms::ApplicationController
  skip_before_action :authenticate_author_from_token!, only: :index
  before_action :set_post, only: %w(edit destroy)
  protect_from_forgery except: %w(create update destroy)

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
    render json: @post, root: false
  end

  def update
    post = Post::Form.find(params[:id])
    if post.save_from_associations(post_params)
      render nothing: true, status: :ok
    else
      render_error(post)
    end
  end

  def destroy
    if @post.update(accepted: false)
      render nothing: true, status: :ok
    else
      render_error(@post)
    end
  end

  private

  def post_params
    params.require(:post).permit(
      :id, :title, :description, :published_at,
      items_attributes: [:id, :target_id, :target_type, :title],
      taggings_attributes: [:id, :text],
    )
  end

  def set_post
    @post = Post.find(params[:id])
  end

end