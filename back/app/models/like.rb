class Like < ApplicationRecord
  belongs_to :account
  belongs_to :photo
  counter_culture :photo
end
