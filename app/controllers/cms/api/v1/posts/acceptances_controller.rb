class Cms::Api::V1::Posts::AcceptancesController < Cms::ApplicationController

  def update
    post = Post::Form.find(params[:post_id])
    if post.update(accepted: !post.accepted)
      render json: { accepted: post.accepted, status: post.status }
    else
      head :bad_request
    end
  end

end