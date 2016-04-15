class CreateArticles < ActiveRecord::Migration[5.0]
  def change
    create_table :articles do |t|
      t.string :title, null: false
      t.datetime :accepted_at, null: false

      t.timestamps
    end
  end
end
