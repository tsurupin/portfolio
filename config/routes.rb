Rails.application.routes.draw do
  get '/health_check' => 'application#health_check'

  scope module: :cms do
    namespace :api, default: { format: :json } do
      resources :articles
    end
    get '/cms', to: 'application#home'
  end

  # Serve websocket cable requests in-process
  mount ActionCable.server => '/cable'
end
