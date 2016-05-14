class Cms::Api::ProjectsController < Cms::ApplicationController
  # skip_before_action :authenticate_author_from_token!, only: :index
  protect_from_forgery except: %w(create update destroy)

  def index
    projects = Project.order(updated_at: :desc)
    render json: projects, each_serializer: ProjectsSerializer
  end

  def new
    project = Project.new
    render json: project, root: false
  end

  def edit
    project = Project.find(params[:id])
    render json: project, root: false
  end
end