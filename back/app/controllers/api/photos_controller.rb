class Api::PhotosController < ApplicationController
  skip_before_action :authenticate_account!, only: [:index]

  def presigned_post_data
    @presigned_object = S3_BUCKET.presigned_post(
      key: "uploads/photo/#{SecureRandom.uuid}/${filename}",
      success_action_status: '201',
      acl: 'public-read',
      content_length_range: 0..512000,
      expires: Time.now + 60)
      
      render json: {url: @presigned_object.url, fields: @presigned_object.fields}
  end

  def create
    photo = Photo.new(photo_params)
    if photo.save
      render json: { status: 'SUCCESS', data: photo }
    else
      render json: { status: 'ERROR', data: photo.errors }
    end
  end

  def index
    liked_user = current_account ? current_account.id.presence || "" : ""
    puts "liked_user: #{liked_user}"
    puts "current_account: #{current_account}"
    # puts "current_accountID: #{current_account.id}"
    
    photo = Photo.preload(:account)
    render json: photo, each_serializer: PhotoSerializer, liked_user: liked_user
  end
  
  private
  def photo_params
    params.require(:photo).permit(:filename, :account_id)
  end
end