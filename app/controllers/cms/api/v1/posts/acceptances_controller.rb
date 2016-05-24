class Cms::Api::V1::Posts::AcceptancesController < Cms::ApplicationController

  def update
    post = Post.find(params[:post_id])
    if post.update(accepted: !post.accepted)
      head :ok
    else
      head :bad_request
    end
  end

end