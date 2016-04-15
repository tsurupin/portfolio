class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def health_check
    render text:  'ok', status: :ok
  end

end
