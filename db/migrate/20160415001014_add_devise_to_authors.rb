class AddDeviseToAuthors < ActiveRecord::Migration
  def change
    create_table :authors do |t|
      ## Database authenticatable
      t.string :email,              null: false, default: ""
      t.string :encrypted_password, null: false, default: ""


      # Customize
      t.string :name, null: false, unique: true
      t.string :image
      t.text :description
      t.string :github_url, null: false, unique: true, default: ''
      t.string :access_token

      t.timestamps null: false
    end
  end
end
