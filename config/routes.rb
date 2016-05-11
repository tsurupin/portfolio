Rails.application.routes.draw do

  get '/health_check' => 'application#health_check'

  namespace :cms do
    namespace :api, default: { format: :json } do
      resources :posts, shallow: true do
        resource :acceptance, only: :update, module: :posts
      end

      devise_for :authors, controllers: {
        registrations: 'cms/api/authors/registrations',
        sessions: 'cms/api/authors/sessions'
      }, path_names: { sign_up: 'sign-up', sign_in: 'sign-in', sign_out: 'sign-out' }

      resource :authors, except: %w(new create), constraints: { id: /[0-9]+/ }

      resources :services, only: %w() do
        collection do
          get :html
          get :twitter
        end
      end
    end

    get '/', to: 'application#layout'
    get "*path", to: "application#layout", default: { format: :html }

  end

end
