class Cms::Api::AuthorsController < Cms::ApplicationController
  skip_before_action :authenticate_author_from_token!, only: :create
  #protect_from_forgery except: %w(create update)

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
    author = Author::Form.find(current_cms_api_author.id)
    p author_params
    if author.save(author_params)
      render nothing: true, status: :ok
    else
      render_error(author)
    end
  end

  private

  def author_params
    params.require(:author).permit(*Author::Form::PERMITTED_ATTRIBUTES)
  end

  def render_author
    render json: current_cms_api_author, root: false
  end
end