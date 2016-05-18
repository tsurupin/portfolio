class Initialize < ActiveRecord::Migration
  def change

    create_table :social_accounts do |t|
      t.belongs_to :author, null: false
      t.string :name, null: false
      t.string :url, null: false
      t.string :image, null: false
    end

    create_table :posts do |t|
      t.string :title, null: false, unique: true
      t.text :description
      t.boolean :accepted, null: false, default: false
      t.datetime :published_at

      t.timestamps null: false
    end

    create_table :comments do |t|
      t.belongs_to :post, index: true, null: false
      t.text :comment, null: false
      t.integer :reply_id

      t.timestamps null: false
    end

    create_table :sites do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.string :image
      t.string :source_url

      t.timestamps null: false
    end

    create_table :items do |t|
      t.belongs_to    :post, index: true, null: false
      t.integer       :sort_rank, null: false
      t.belongs_to    :target, polymorphic: true, null: false, index: true

      t.timestamps    null: false
    end

    add_index :items, [:post_id, :sort_rank]

    create_table :item_images do |t|
      t.string    :image, null: false
    end

    create_table :item_texts do |t|
      t.text      :description, null: false
    end

    create_table :item_headings do |t|
      t.string    :title, null: false
    end

    create_table :item_sub_headings do |t|
      t.string     :title, null: false
    end

    create_table :item_links do |t|
      t.string     :source_title, null: false
      t.text       :source_url, null: false
    end

    create_table :item_quotes do |t|
      t.text       :description, null: false
      t.text       :source_url, null: false
    end

    create_table :item_twitters do |t|
      t.text      :source_url, null: false
      t.text      :description, null: false
      t.string    :author_image_url, null: false
      t.string    :author_name, null: false
      t.string    :author_screen_name, null: false
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

    create_table :projects do |t|
      t.string :title, null: false, unique: true
      t.text :description
      t.string :image
      t.string :sample_url
      t.string :source_url
      t.boolean :accepted, null: false, default: false

      t.timestamps null: false
    end

  end
end
