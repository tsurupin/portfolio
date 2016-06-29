class AddDeviseToAuthors < ActiveRecord::Migration
  def change
    create_table :authors do |t|
      t.string :email,              null: false, unique: true
      t.string :encrypted_password, null: false, unique: true

      # Customize
      t.string :name, null: false, unique: true
      t.string :image
      t.text :introduction
      t.text :description
      t.string :access_token, unique: true

      t.timestamps null: false
    end
  end
end
