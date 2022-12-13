Rails.application.routes.draw do
  resources :memberships
  resources :groups, only: [:index, :show]
  resources :users, except: [:create, :destroy] do
    resources :groups
  end

  post '/signup', to: 'users#create'
  post '/login', to: 'sessions#create'
  get '/me', to: 'sessions#show'
  delete '/logout', to: 'sessions#destroy'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
