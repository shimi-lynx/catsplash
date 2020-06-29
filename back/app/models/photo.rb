class Photo < ApplicationRecord
  belongs_to :account
  has_many :likes, dependent: :destroy
end
