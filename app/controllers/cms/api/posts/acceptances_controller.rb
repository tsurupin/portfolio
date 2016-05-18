class Cms::Api::Posts::AcceptancesController < Cms::ApplicationController

  def update
    post = Post.find(params[:post_id])
    status = post.toggle!(:accepted) ? 200 : 500
    render json: { status: status }
  end

end