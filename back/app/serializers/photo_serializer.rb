class PhotoSerializer < ActiveModel::Serializer
  attributes :id, :filename, :is_like
  belongs_to :account

  def is_like
    Like.where({account_id: @instance_options[:liked_user] , photo_id: object.id}).present?
  end
  
end
