class Cms::Api::PostsController < Cms::ApplicationController
  protect_from_forgery except: %w(create update destroy)
  before_action :set_post_tags, only: %w(new edit)

  def index
    @posts = [{title: 'hoge', description: 'description', id: 1, published: true}]
    render json: @posts
  end

  def new
    render json: {
      tags: {
        tags: [],
        tagSuggestions: @post_tags
      }
    }
  end

  def create
    @post = Post::Form.new
    save_and_render
  end

  def edit
    @post = Post.find(params[:id])
    render json: {
      post: @post.attributes.transform_keys { |post| post.camelize(:lower) },
      items: @post.items.map{ |item| {}.merge!(item.target.attributes)
                                       .merge!(item.attributes)
                                       .transform_keys { |key| key.camelize(:lower) }
      },
      tags: {
        tags: @post.post_taggings.map{ |tag| { id: tag.id, text: tag.name }},
        tagSuggestions: @post_tags
      }
    }

  end

  def update
    @post = Post::Form.find(params[:id])
    save_and_render
  end

  def destroy

  end

  private

  def post_params
    params.require(:post).permit(
      :id, :title, :description, :published_at,
      items_attributes: [:id, :target_id, :target_type, :title],
      post_taggings_attributes: [:id, :text],
    )
  end

  def set_post_tags
    @post_tags = PostTag.pluck(:name)
  end

  def save_and_render
    status_code = @post.new_record? ? 201 : 200
    if @post.save_all(post_params)
      render nothing: true, status_code: status_code
    else
      p @post.errors.full_messages.join('')
      render json: { errorMessage: @post.errors.full_messages.join('') }, status: 400
    end
  end

end