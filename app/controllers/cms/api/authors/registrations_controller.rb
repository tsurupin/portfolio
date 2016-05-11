class Cms::Api::Authors::RegistrationsController < Devise::RegistrationsController
  prepend_before_action :require_no_authentication, only: :create
  #before_action :configure_sign_up_params, only: :create

  def create


  end

  protected

  def author_params
    params.quire(:author).permit(:name, :email, :password)
  end

  def configure_sign_up_params
    devise_parameter_sanitizer.for(:sign_up) << [:name]
  end
end
