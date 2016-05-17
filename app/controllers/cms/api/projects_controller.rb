class Cms::Api::ProjectsController < Cms::ApplicationController
  protect_from_forgery except: %w(create update destroy)
  before_action :set_project, only: %w(edit destroy)

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
    render json: @project, root: false
  end

  def update
    project = Project::Form.find(params[:id])
    if project.save(project_params)
      render nothing: true, status: :ok
    else
      render_error(project)
    end
  end

  def destroy
    if @project.update(accepted: false)
      render nothing: true, status: :ok
    else
      render_error(@project)
    end
  end

  private

  def project_params
    params.require(:project).permit(
      :title, :description, :image, :sample_url, :source_url,
      taggings_attributes: [:id, :text]
    )
  end

  def set_project
    @project = Project.find(params[:id])
  end

end