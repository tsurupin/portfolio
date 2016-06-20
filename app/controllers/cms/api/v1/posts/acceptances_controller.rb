class Cms::Api::V1::Posts::AcceptancesController < Cms::ApplicationController

  def update
    post = Post::Form.find(params[:post_id])
    if post.update(accepted: !post.accepted)
      # TODO: need to refactor
      status =
        if !post.accepted then 0
        elsif post.published_at <= Time.current then 2
        else 1
        end
      render json: { accepted: post.accepted, status: status }
    else
      head :bad_request
    end
  end

end