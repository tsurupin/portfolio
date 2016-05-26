class Cms::Api::V1::Projects::AcceptancesController < Cms::ApplicationController

  def update
    project = Project.find(params[:project_id])
    if project.update(accepted: !project.accepted)
      head :ok
    else
      head :bad_request
    end
  end
end