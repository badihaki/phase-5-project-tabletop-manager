Rails.application.routes.draw do
  namespace :api do
    resources :characters, exclude: [:show]
    resources :group_messages, exclude: [:delete]  
    resources :memberships
    resources :groups
    post '/signup', to: 'users#create'
    post '/login', to: 'sessions#create'
    get '/me', to: 'users#show'
    delete '/logout', to: 'sessions#destroy'
  end
  mount ActionCable.server => '/cable'
  # resources :characters
  # resources :group_messages, exclude: [:delete]
  # mount ActionCable.server => '/cable'
  # resources :memberships
  # resources :groups
  # post '/signup', to: 'users#create'
  # post '/login', to: 'sessions#create'
  # get '/me', to: 'users#show'
  # delete '/logout', to: 'sessions#destroy'
  
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
