LocalBeat::Application.routes.draw do
  get '/session/new', to: 'session#new', as: 'new_session'
  post '/session', to: 'session#create', as: 'create_session'
  delete '/session', to: 'session#destroy'

  resources :artists, only: [:new, :create]
  resources :locations, only: [:new, :create]
  resources :users, only: [:new, :create, :edit, :destroy, :update]
end
