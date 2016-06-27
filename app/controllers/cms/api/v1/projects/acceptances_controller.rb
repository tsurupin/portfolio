class Cms::Api::V1::Projects::AcceptancesController < Cms::ApplicationController
  def update
    project = Project::Form.find(params[:project_id])
    if project.update(accepted: !project.accepted)
      render json: { accepted: project.accepted }, status: :ok
    else
      render_error_message(project)
    end
  end
end
