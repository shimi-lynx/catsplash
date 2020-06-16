class Api::PhotosController < ApplicationController

  def presigned_post_data
    @presigned_object = S3_BUCKET.presigned_post(
      key: "uploads/photo/#{SecureRandom.uuid}/${filename}",
      success_action_status: '201',
      acl: 'public-read',
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

  private
  def photo_params
    params.require(:photo).permit(:filename, :account_id)
  end
end