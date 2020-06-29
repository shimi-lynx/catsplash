class Api::LikesController < ApplicationController

  def like
    unless Photo.find_by(id: params[:like][:photo_id])
      return false
    end

    like = Like.new(like_params)
    if like.save
      render json: { status: 'SUCCESS', data: like }
    else
      render json: { status: 'ERROR', data: like.errors }
    end
  end

  def unlike
    like = Like.where(like_params)
    
    if like.destroy_all
      render json: { status: 'SUCCESS', data: like }
    else
      render json: { status: 'ERROR', data: like.errors }
    end

  end

  private
  def like_params
    params.require(:like).permit(:id, :account_id, :photo_id)
  end
end
