class Cms::Api::ProjectsController < Cms::ApplicationController
  protect_from_forgery except: %w(create update destroy)

  def index
    projects = Project.order(updated_at: :desc).limit(1)
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
      p project.errors.full_messages.join('')
      render json: { errorMessage: project.errors.full_messages.join('') }, status: :bad_request
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
      p project.errors.full_messages.join('')
      render json: { errorMessage: project.errors.full_messages.join('') }, status: :bad_request
    end
  end

  private

  def project_params
    params.require(:project).permit(
      :title, :description, :image, :sample_url, :source_url,
      taggings_attributes: [:id, :text]
    )
  end

end