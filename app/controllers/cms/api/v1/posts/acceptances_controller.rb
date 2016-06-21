class Cms::Api::V1::Posts::AcceptancesController < Cms::ApplicationController

  def update
    post = Post::Form.find(params[:post_id])
    if post.update(accepted: !post.accepted)
      render json: { accepted: post.accepted, status: post.status }
    else
      render_error_message(post)
    end
  end

end