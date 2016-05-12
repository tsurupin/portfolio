class Cms::Api::AuthorsController < Cms::ApplicationController
  skip_before_action :authenticate_author_from_token!, only: :create

  respond_to :json

  def create
    author = Author.new(author_params)
    if author.save
      render json: { accessToken: author.access_token }
    else
      render json: { error: 'author create error' }, status: :unprocessable_entity
    end
  end

  private

  def author_params
    params.require(:author).permit(:name, :email, :password, :password_confirmation)
  end
end