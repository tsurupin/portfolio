class Client::Api::V1::ProjectsController < Client::ApplicationController

  def index
    projects = Project::Search.client_search(params)
    render json: projects, each_serializer: ProjectsSerializer
  end

end