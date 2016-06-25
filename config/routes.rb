Rails.application.routes.draw do



  ################################################################################
  # For Admin
  namespace :cms do
    namespace :api, default: { format: :json } do
      namespace :v1 do
        resources :posts, except: :destroy do
          resource :acceptance, only: :update, module: :posts
        end

        resources :projects, except: %w(show destroy) do
          resource :acceptance, only: :update, module: :projects
        end

        devise_for :authors, only: :sessions,
                   controllers: { sessions: 'cms/api/v1/authors/sessions' },
                   path_names: { sign_in: 'sign-in', sign_out: 'sign-out' }

        resource :authors, except: %w(new show create), constraints: { id: /[0-9]+/ } do
          post :sign_up, path: 'sign-up', to: 'authors#create'
        end

        resource :services, only: [] do
          resource :twitter, only: :show, module: :services
        end
      end
    end
    get '/', to: 'application#layout'
    get "*path", to: "application#layout"

  end

  ################################################################################
  # For General User
  scope module: :client do
    namespace :api, default: { format: :json } do
      namespace :v1 do
        resource :home, only: :show
        resource :about, only: :show
        resources :projects, only: :index
        resources :posts, only: %w(index show)
      end
    end
    get '/', to: 'application#layout'
    get "*path", to: "application#layout"
  end


  get '/health_check' => 'application#health_check'

end
