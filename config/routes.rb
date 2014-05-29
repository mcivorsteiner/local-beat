LocalBeat::Application.routes.draw do
  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)

  root to: 'pages#index'

  get '/session/new', to: 'session#new', as: 'new_session'
  post '/session', to: 'session#create', as: 'create_session'
  delete '/session', to: 'session#destroy'

  get '/events', to: 'events#search'

  get '/events/sk_location_id', to: 'events#search_by_sk_location_id'

  resources :users, only: [:create]

  put '/users', to: 'users#update'

  # resources :users, only: [:create, :edit, :destroy, :update]

  get '/locations', to: 'locations#search'
  get '/events/detailed_info', to: 'events#detailed_info'

end
