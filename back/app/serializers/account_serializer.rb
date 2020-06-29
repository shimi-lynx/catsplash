class AccountSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :photos

end
