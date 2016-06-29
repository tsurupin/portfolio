class Initialize < ActiveRecord::Migration
  def change

    create_table :social_accounts do |t|
      t.belongs_to :author, null: false
      t.integer :account_type, null: false, unique: true
      t.string :url, null: false, unique: true
    end

    add_index :social_accounts, [:account_type, :author_id], unique: true

    create_table :posts do |t|
      t.string :title, null: false, unique: true
      t.boolean :accepted, null: false, default: false
      t.datetime :published_at
      t.string :lead_sentence

      t.timestamps null: false
    end

    add_index :posts, [:accepted, :published_at]
    add_index :posts, :updated_at

    create_table :items do |t|
      t.belongs_to    :post, index: true, null: false
      t.integer       :sort_rank, null: false
      t.belongs_to    :target, polymorphic: true, null: false, index: true, unique: true

      t.timestamps    null: false
    end

    add_index :items, [:post_id, :sort_rank]

    create_table :item_images do |t|
      t.string    :image, null: false
      t.string    :caption
    end

    create_table :item_texts do |t|
      t.text      :description, null: false
    end

    create_table :item_twitters do |t|
      t.string :twitter_id, null: false
    end

    create_table :tags do |t|
      t.string :name, null: false, unique: true
      t.timestamps
    end

    create_table :taggings do |t|
      t.belongs_to :tag, null: false
      t.belongs_to :subject, polymorphic: true, null: false, index: true
      t.timestamps
    end
    add_index :taggings, [:tag_id, :subject_id, :subject_type], unique: true

    create_table :projects do |t|
      t.string :title, null: false, unique: true
      t.text :description
      t.string :image
      t.string :caption
      t.string :source_url
      t.boolean :accepted, null: false, default: false

      t.timestamps null: false
    end
    add_index :projects, :updated_at

  end
end
