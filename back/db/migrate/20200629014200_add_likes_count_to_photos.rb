class AddLikesCountToPhotos < ActiveRecord::Migration[6.0]
  def self.up
    add_column :photos, :likes_count, :integer, null: false, default: 0
  end

  def self.down
    remove_column :photos, :likes_count
  end
end
