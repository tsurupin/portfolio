class Cms::Api::Authors::SessionsController < Devise::SessionsController
  prepend_before_action :require_no_authentication, only: [:new, :create]
  before_action :configure_sign_in_params, only: :create

  def new
    super
  end

  def create
    super
  end

  def destroy
    super
  end

  #protected

  def after_sign_in_path_for(_resource)
    _resource.admin? ? admin_dashboard_path : admin_writer_path(_resource.id)
  end

  def after_sign_out_path_for(_resource)
    new_admin_writer_session_path
  end

  def configure_sign_in_params
    devise_parameter_sanitizer.for(:sign_in) << [:name]
  end
end
