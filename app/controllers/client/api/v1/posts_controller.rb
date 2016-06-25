class Client::Api::V1::PostsController < Client::ApplicationController

  def index
    posts = rails_cache("cached_posts?page=#{params{:page}}&tag=#{params[:tag]}") do
      temp_posts = Post::Search.client_search(params).page(params[:page])
      Kaminari::PaginatableArray.new(temp_posts.to_a, total_count: temp_posts.total_count)
    end
    render json: posts, each_serializer: PostsSerializer,
           meta: pagination(params[:page], Post::PAGINATES_PER, posts.total_count)
  end

  def show
    post = #= rails_cache("cached_posts/#{params[:id]}") do
      Post.includes(:tags, items: :target).find(params[:id])
    #end
    render json: post
  end
end