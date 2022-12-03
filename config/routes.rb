Rails.application.routes.draw do
  resources :memberships
  resources :groups
  resources :users, except: [:destroy]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
