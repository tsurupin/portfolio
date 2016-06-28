class Cms::Api::V1::AuthorsController < Cms::ApplicationController
  skip_before_action :authenticate_author_from_token!, only: :create

  def create
    author = Author.new(author_params)
    if author.save
      render json: { accessToken: author.access_token }
    else
      render json: { errorMessage: 'author create error' }, status: :unprocessable_entity
    end
  end

  def edit
    render json: Cms::AuthorSerializer.new(current_cms_api_v1_author)
  end

  def update
    # TODO: figure out how to change device helper name
    author = Author::Form.find(current_cms_api_v1_author.id)
    if author.save(author_params)
      head :ok
    else
      render_error_message(author)
    end
  end

  private

  def author_params
    params.require(:author).permit(*Author::Form::PERMITTED_ATTRIBUTES)
  end
end
