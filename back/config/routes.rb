Rails.application.routes.draw do
  get 'health/', to: 'health_check#index'
  namespace :api do
      get 'photos/s3', to: 'photos#presigned_post_data', as: 'photo_upload'
      get 'photos/', to: 'photos#index', as: 'index_photo'
      post 'photos/', to: 'photos#create', as: 'create_photo'
      post 'photos/like', to: 'likes#like', as: 'create_like'
      delete 'photos/like', to: 'likes#unlike', as: 'delete_like'
  end
  scope :api do
    mount_devise_token_auth_for 'Account', at: 'auth'
    # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
    
    end
end
