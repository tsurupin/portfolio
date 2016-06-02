class Client::Api::V1::ProjectsController < Client::ApplicationController

  def index
    projects = Project.latest
    render json: projects, each_serializer: ProjectsSerializer
  end

end