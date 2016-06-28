class Cms::Api::V1::ProjectsController < Cms::ApplicationController
  def index
    projects = Project::Search.eager_load(:tags).latest
    render json: projects, each_serializer: Cms::ProjectsSerializer
  end

  def new
    project = Project.new
    render json: Cms::ProjectSerializer.new(project)
  end

  def create
    project = Project::Form.new
    if project.save_from_associations(project_params)
      head :created
    else
      render_error_message(project)
    end
  end

  def edit
    project = Project.find(params[:id])
    render json: Cms::ProjectSerializer.new(project)
  end

  def update
    project = Project::Form.find(params[:id])
    if project.save_from_associations(project_params)
      head :ok
    else
      render_error_message(project)
    end
  end

  private

  def project_params
    params.require(:project).permit(*Project::Form::PERMITTED_ATTRIBUTES)
  end
end
