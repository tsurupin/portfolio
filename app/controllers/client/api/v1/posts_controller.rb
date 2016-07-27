class Client::Api::V1::PostsController < Client::ApplicationController
  before_action :transform_params, only: :index

  def index
    posts = rails_cache("cached_posts?page=#{params[:page]}&tag_id=#{params[:tag_id]}") do
      temp_posts = Post::Search.client_search(params).page(params[:page])
      Kaminari::PaginatableArray.new(temp_posts.to_a, total_count: temp_posts.total_count)
    end

    render json: posts, each_serializer: Client::PostsSerializer,
           meta: pagination(params[:page], Post::PAGINATES_PER, posts.total_count)
  end

  def show
    cache_name = "cached_posts/#{params[:id]}"
    cache_name += "?#{params[:previewing]}" if params[:previewing]

    json = rails_cache(cache_name) do
      post = Post::Search.includes(:tags, items: :target)
      post = if params[:previewing]
               post.find_by(id: params[:id])
             else
               post.published.find_by(id: params[:id])
             end
      Client::PostSerializer.new(post).to_json
    end
    # NOTE: to_json returns null if object is nil
    if json != 'null'
      render json: json
    else
      render json: { errorMessage: 'RecordNotFound' }, status: :not_found
    end
  end
end
