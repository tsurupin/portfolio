class Cms::Api::AuthorsController < Cms::ApplicationController
  skip_before_action :authenticate_author_from_token!, only: :create

  def create
    author = Author.new(author_params)
    if author.save
      render json: { accessToken: author.access_token }
    else
      render json: { error: 'author create error' }, status: :unprocessable_entity
    end
  end

  def show
    render_author
  end

  def edit
    render_author
  end

  def update
    if current_cms_api_author.update(author_params)
      render nothing: true, status: :ok
    else
      render_error(current_cms_api_author)
    end
  end

  private

  def author_params
    params.require(:author).permit(*Author::PERMITTED_ATTRIBUTES)
  end

  def render_author
    render json: current_cms_api_author, root: false
  end
end