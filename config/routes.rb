Rails.application.routes.draw do
  get '/health_check' => 'application#health_check'

  namespace :cms do
    namespace :api, default: { format: :json } do
      resources :articles
    end
    get '/', to: 'application#home'
  end

  # Serve websocket cable requests in-process
  mount ActionCable.server => '/cable'
end
