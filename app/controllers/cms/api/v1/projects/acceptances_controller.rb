class Cms::Api::Projects::AcceptancesController < Cms::ApplicationController

  def update
    project = Project.find(params[:project_id])
    status = project.toggle!(:accepted) ? 200 : 500
    render json: { status: status }
  end
end