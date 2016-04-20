# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160415005054) do

  create_table "authors", force: :cascade do |t|
    t.string   "name",        null: false
    t.string   "image"
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "comments", force: :cascade do |t|
    t.integer  "post_id",    null: false
    t.text     "comment",    null: false
    t.integer  "reply_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "comments", ["post_id"], name: "index_comments_on_post_id"

  create_table "item_headings", force: :cascade do |t|
    t.string "title", null: false
  end

  create_table "item_images", force: :cascade do |t|
    t.text   "source_url"
    t.string "image",      null: false
  end

  create_table "item_links", force: :cascade do |t|
    t.string "source_title", null: false
    t.text   "source_url",   null: false
  end

  create_table "item_quotes", force: :cascade do |t|
    t.text   "description",  null: false
    t.string "source_title", null: false
    t.text   "source_url",   null: false
  end

  create_table "item_sub_headings", force: :cascade do |t|
    t.string "title", null: false
  end

  create_table "item_texts", force: :cascade do |t|
    t.integer "type",        default: 1, null: false, comment: "1: normal text, 2: source_code"
    t.text    "description",             null: false
  end

  create_table "item_twitters", force: :cascade do |t|
    t.text   "source_url",         null: false
    t.text   "description",        null: false
    t.string "author_image_url",   null: false
    t.string "author_name",        null: false
    t.string "author_screen_name", null: false
  end

  create_table "items", force: :cascade do |t|
    t.integer  "post_id",     null: false
    t.integer  "sort_rank",   null: false
    t.string   "target_type", null: false
    t.integer  "target_id",   null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "items", ["post_id", "sort_rank"], name: "index_items_on_post_id_and_sort_rank"
  add_index "items", ["post_id"], name: "index_items_on_post_id"
  add_index "items", ["target_type", "target_id"], name: "index_items_on_target_type_and_target_id"

  create_table "post_taggings", force: :cascade do |t|
    t.integer "post_id",     null: false
    t.integer "post_tag_id", null: false
  end

  add_index "post_taggings", ["post_id", "post_tag_id"], name: "index_post_taggings_on_post_id_and_post_tag_id", unique: true
  add_index "post_taggings", ["post_id"], name: "index_post_taggings_on_post_id"
  add_index "post_taggings", ["post_tag_id"], name: "index_post_taggings_on_post_tag_id"

  create_table "post_tags", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "posts", force: :cascade do |t|
    t.string   "title",                        null: false
    t.text     "description",                  null: false
    t.boolean  "accepted",     default: false, null: false
    t.datetime "published_at"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
  end

  create_table "project_taggings", force: :cascade do |t|
    t.integer "project_id",     null: false
    t.integer "project_tag_id", null: false
  end

  add_index "project_taggings", ["project_id", "project_tag_id"], name: "index_project_taggings_on_project_id_and_project_tag_id", unique: true
  add_index "project_taggings", ["project_id"], name: "index_project_taggings_on_project_id"
  add_index "project_taggings", ["project_tag_id"], name: "index_project_taggings_on_project_tag_id"

  create_table "project_tags", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "projects", force: :cascade do |t|
    t.string   "title",                       null: false
    t.text     "description",                 null: false
    t.string   "image",                       null: false
    t.string   "sample_url"
    t.string   "source_url"
    t.boolean  "accepted",    default: false, null: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  create_table "sites", force: :cascade do |t|
    t.string   "title",       null: false
    t.text     "description", null: false
    t.string   "image"
    t.string   "source_url"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "social_accounts", force: :cascade do |t|
    t.integer "author_id", null: false
    t.string  "name",      null: false
    t.string  "url",       null: false
    t.string  "image",     null: false
  end

  add_index "social_accounts", ["author_id"], name: "index_social_accounts_on_author_id"

end
