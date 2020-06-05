class CreatePhotos < ActiveRecord::Migration[6.0]
  def change
    create_table :photos do |t|
      t.string :filename, null: false
      t.references :accounts, null: false, foreign_key: true

      t.timestamps
    end
  end
end
