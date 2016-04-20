class Cms::Api::Posts::AcceptancesController < Cms::ApplicationController
  before_action :set_post

  def update
    status = @post.toggle!(:accepted) ? 200 : 500
    render json: { status: status }
  end

  def set_post
    @post = Post.find(params[:post_id])
  end

end