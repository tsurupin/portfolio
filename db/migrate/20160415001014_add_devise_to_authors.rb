class AddDeviseToAuthors < ActiveRecord::Migration
  def change
    create_table :authors do |t|
      ## Database authenticatable
      t.string :email,              null: false, default: ""
      t.string :encrypted_password, null: false, default: ""

      ## Recoverable
      t.string   :reset_password_token
      t.datetime :reset_password_sent_at

      ## Rememberable
      t.datetime :remember_created_at

      # Customize
      t.string :name, null: false, unique: true
      t.string :image
      t.text :description

      t.timestamps null: false
    end

    add_index :authors, :email,                unique: true
    add_index :authors, :reset_password_token, unique: true
  end

end
