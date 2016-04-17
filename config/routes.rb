Rails.application.routes.draw do
  get '/health_check' => 'application#health_check'

  namespace :cms do
    namespace :api, default: { format: :json } do
      resources :articles, shallow: true do
        resource :acceptance, only: :update, module: :articles
      end
    end

    get '/', to: 'application#layout'
    get "*path", to: "application#layout", default: { format: :html }

  end

  # Serve websocket cable requests in-process
  mount ActionCable.server => '/cable'
end
