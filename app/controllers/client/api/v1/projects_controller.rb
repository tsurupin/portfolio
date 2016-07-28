class Client::Api::V1::ProjectsController < Client::ApplicationController
  before_action :transform_params, only: :index

  def index
    json = rails_cache("cached_projects?tag_id=#{params[:tag_id]}") do
      projects = Project::Search.client_search(params)
      { projects: ActiveModel::ArraySerializer.new(projects, each_serializer:  Client::ProjectsSerializer) }.to_json
    end
    render json: json
  end
end
