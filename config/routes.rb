Rails.application.routes.draw do

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy, :show]
    resources :servers, only: [:index, :show, :create, :destroy] do
      resources :channels, only: [:index, :create]
    end
    resources :channels, only: [:show, :destroy]
    resources :server_memberships, only: [:create, :destroy]
  end

  root "static_pages#root"

end
