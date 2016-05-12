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
    t.string   "email",              limit: 255,   default: "", null: false
    t.string   "encrypted_password", limit: 255,   default: "", null: false
    t.string   "name",               limit: 255,                null: false
    t.string   "image",              limit: 255
    t.text     "description",        limit: 65535
    t.string   "access_token",       limit: 255
    t.datetime "created_at",                                    null: false
    t.datetime "updated_at",                                    null: false
  end

  create_table "comments", force: :cascade do |t|
    t.integer  "post_id",    limit: 4,     null: false
    t.text     "comment",    limit: 65535, null: false
    t.integer  "reply_id",   limit: 4
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  add_index "comments", ["post_id"], name: "index_comments_on_post_id", using: :btree

  create_table "item_headings", force: :cascade do |t|
    t.string "title", limit: 255, null: false
  end

  create_table "item_images", force: :cascade do |t|
    t.string "image", limit: 255, null: false
  end

  create_table "item_links", force: :cascade do |t|
    t.string "source_title", limit: 255,   null: false
    t.text   "source_url",   limit: 65535, null: false
  end

  create_table "item_quotes", force: :cascade do |t|
    t.text "description", limit: 65535, null: false
    t.text "source_url",  limit: 65535, null: false
  end

  create_table "item_sub_headings", force: :cascade do |t|
    t.string "title", limit: 255, null: false
  end

  create_table "item_texts", force: :cascade do |t|
    t.integer "type",        limit: 4,     default: 1, null: false, comment: "1: normal text, 2: source_code"
    t.text    "description", limit: 65535,             null: false
  end

  create_table "item_twitters", force: :cascade do |t|
    t.text   "source_url",         limit: 65535, null: false
    t.text   "description",        limit: 65535, null: false
    t.string "author_image_url",   limit: 255,   null: false
    t.string "author_name",        limit: 255,   null: false
    t.string "author_screen_name", limit: 255,   null: false
  end

  create_table "items", force: :cascade do |t|
    t.integer  "post_id",     limit: 4,   null: false
    t.integer  "sort_rank",   limit: 4,   null: false
    t.integer  "target_id",   limit: 4,   null: false
    t.string   "target_type", limit: 255, null: false
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  add_index "items", ["post_id", "sort_rank"], name: "index_items_on_post_id_and_sort_rank", using: :btree
  add_index "items", ["post_id"], name: "index_items_on_post_id", using: :btree
  add_index "items", ["target_type", "target_id"], name: "index_items_on_target_type_and_target_id", using: :btree

  create_table "post_taggings", force: :cascade do |t|
    t.integer "post_id",     limit: 4, null: false
    t.integer "post_tag_id", limit: 4, null: false
  end

  add_index "post_taggings", ["post_id", "post_tag_id"], name: "index_post_taggings_on_post_id_and_post_tag_id", unique: true, using: :btree

  create_table "post_tags", force: :cascade do |t|
    t.string   "name",       limit: 255, null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "posts", force: :cascade do |t|
    t.string   "title",        limit: 255,                   null: false
    t.text     "description",  limit: 65535
    t.boolean  "accepted",                   default: false, null: false
    t.datetime "published_at"
    t.datetime "created_at",                                 null: false
    t.datetime "updated_at",                                 null: false
  end

  create_table "project_taggings", force: :cascade do |t|
    t.integer "project_id",     limit: 4, null: false
    t.integer "project_tag_id", limit: 4, null: false
  end

  add_index "project_taggings", ["project_id", "project_tag_id"], name: "index_project_taggings_on_project_id_and_project_tag_id", unique: true, using: :btree

  create_table "project_tags", force: :cascade do |t|
    t.string   "name",       limit: 255, null: false
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "projects", force: :cascade do |t|
    t.string   "title",       limit: 255,                   null: false
    t.text     "description", limit: 65535,                 null: false
    t.string   "image",       limit: 255,                   null: false
    t.string   "sample_url",  limit: 255
    t.string   "source_url",  limit: 255
    t.boolean  "accepted",                  default: false, null: false
    t.datetime "created_at",                                null: false
    t.datetime "updated_at",                                null: false
  end

  create_table "sites", force: :cascade do |t|
    t.string   "title",       limit: 255,   null: false
    t.text     "description", limit: 65535, null: false
    t.string   "image",       limit: 255
    t.string   "source_url",  limit: 255
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  create_table "social_accounts", force: :cascade do |t|
    t.integer "author_id", limit: 4,   null: false
    t.string  "name",      limit: 255, null: false
    t.string  "url",       limit: 255, null: false
    t.string  "image",     limit: 255, null: false
  end

end
