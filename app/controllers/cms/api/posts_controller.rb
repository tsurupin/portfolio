class Cms::Api::PostsController < Cms::ApplicationController
  skip_before_action :authenticate_author_from_token!, only: :index

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
    if post.save_all(post_params)
      render nothing: true, status_code: 201
    else
      p post.errors.full_messages.join('')
      render json: { errorMessage: post.errors.full_messages.join('') }, status: 400
    end
  end

  def edit
    post = Post.find(params[:id])
    render json: post, root: false
  end

  def update
    post = Post::Form.find(params[:id])
    if post.save_all(post_params)
      render nothing: true, status_code: 200
    else
      p post.errors.full_messages.join('')
      render json: { errorMessage: post.errors.full_messages.join('') }, status: 400
    end
  end

  def destroy; end

  private

  def post_params
    params.require(:post).permit(
      :id, :title, :description, :published_at,
      items_attributes: [:id, :target_id, :target_type, :title],
      post_taggings_attributes: [:id, :text],
    )
  end

end