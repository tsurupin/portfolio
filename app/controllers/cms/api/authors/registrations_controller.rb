class Cms::Api::Authors::RegistrationsController < Devise::RegistrationsController
  prepend_before_action :require_no_authentication, only: [:new, :create]
  before_action :configure_sign_up_params, only: :create

  def new
    super
  end

  def create
    return redirect_to :back, alert: '利用規約に同意してください' unless params[:admin_writer][:agreement] == '1'
    super
  end

  protected

  def configure_sign_up_params
    devise_parameter_sanitizer.for(:sign_up) << [:name, :agreement]
  end

  def after_sign_up_path_for(_resource)
    admin_writer_path(_resource.id)
  end
end
