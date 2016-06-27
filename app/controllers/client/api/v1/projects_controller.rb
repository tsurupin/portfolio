class Client::Api::V1::ProjectsController < Client::ApplicationController
  def index
    projects = rails_cache("cached_projects?tag=#{params[:tag]}") do
      Project::Search.client_search(params).to_a
    end
    render json: projects, each_serializer:  Client::ProjectsSerializer
  end
end
