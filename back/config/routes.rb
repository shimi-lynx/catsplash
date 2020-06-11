Rails.application.routes.draw do
  namespace :api do
      get 'photos/', to: 'photos#presigned_post_data', as: 'upload'
  end
  scope :api do
    mount_devise_token_auth_for 'Account', at: 'auth'
    # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
    
    end
end
