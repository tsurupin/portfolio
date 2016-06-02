class Cms::Api::V1::ProjectsController < Cms::ApplicationController

  def index
    projects = Project.order(updated_at: :desc)
    render json: projects, each_serializer: ProjectsSerializer
  end

  def new
    project = Project.new
    render json: project
  end

  def create
    project = Project::Form.new
    if project.save(project_params)
      head :created
    else
      render_error_message(project)
    end
  end

  def edit
    project = Project.find(params[:id])
    render json: project
  end

  def update
    project = Project::Form.find(params[:id])
    if project.save(project_params)
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