class Client::Api::V1::ProjectsController < Client::ApplicationController

  def index
    projects = Project.order(updated_at: :desc).page(params[:page])
    render json: projects, each_serializer: ProjectsSerializer
  end

end