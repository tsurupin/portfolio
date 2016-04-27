class Cms::Api::PostsController < Cms::ApplicationController

  def index
    @posts = [{title: 'hoge', description: 'description', id: 1, published: true}]
    render json: @posts
  end

  def create
    @post = Post::Form.new()
    p post_params['items_attributes'].inspect

  end

  def edit

  end

  def update

  end

  private

  def post_params
    params.require(:post).permit(
      :id, :title, :description, :published_at,
      items_attributes: [:type, :title, :image, :source_title, :source_url, :description]
    )
  end

  def save_and_render
    status_code = @post.new_record? ? 201 : 200
    if @post.save_all
      status_code = @post
      render nothing: true, status_code: status_code
    else
      render json: { errorMessage: @post.errors.full_messages.join('') }, status: 400
    end
  end



end