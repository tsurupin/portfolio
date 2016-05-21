class Cms::Api::ProjectsController < Cms::ApplicationController
  protect_from_forgery except: %w(create update)

  def index
    projects = Project.order(updated_at: :desc)
    render json: projects, each_serializer: ProjectsSerializer
  end

  def new
    project = Project.new
    render json: project, root: false
  end

  def create
    project = Project::Form.new
    if project.save(project_params)
      render nothing: true, status: :created
    else
      render_error(project)
    end
  end

  def edit
    project = Project.find(params[:id])
    render json: project, root: false
  end

  def update
    project = Project::Form.find(params[:id])
    if project.save(project_params)
      render nothing: true, status: :ok
    else
      render_error(project)
    end
  end

  private

  def project_params
    params.require(:project).permit(*Project::Form::PERMITTED_ATTRIBUTES)
  end

end