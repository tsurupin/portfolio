class Cms::Api::Projects::AcceptancesController < Cms::ApplicationController
  before_action :set_project

  def update
    status = @project.toggle!(:accepted) ? 200 : 500
    render json: { status: status }
  end

  private

  def set_project
    @project = Project.find(params[:project_id])
  end

end