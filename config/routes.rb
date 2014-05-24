LocalBeat::Application.routes.draw do
  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)

  root to: 'pages#index'

  get '/session/new', to: 'session#new', as: 'new_session'
  post '/session', to: 'session#create', as: 'create_session'
  delete '/session', to: 'session#destroy'

  resources :users, only: [:new, :create, :edit, :destroy, :update]
end
