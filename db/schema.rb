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
    t.string   "email",              limit: 255,   null: false
    t.string   "encrypted_password", limit: 255,   null: false
    t.string   "name",               limit: 255,   null: false
    t.string   "image",              limit: 255
    t.text     "introduction",       limit: 65535
    t.text     "description",        limit: 65535
    t.string   "access_token",       limit: 255
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
  end

  create_table "item_images", force: :cascade do |t|
    t.string "image",   limit: 255, null: false
    t.string "caption", limit: 255
  end

  create_table "item_texts", force: :cascade do |t|
    t.text "description", limit: 65535, null: false
  end

  create_table "item_twitters", force: :cascade do |t|
    t.string "twitter_id", limit: 255, null: false
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

  create_table "posts", force: :cascade do |t|
    t.string   "title",         limit: 255,                 null: false
    t.boolean  "accepted",                  default: false, null: false
    t.datetime "published_at"
    t.string   "lead_sentence", limit: 255
    t.datetime "created_at",                                null: false
    t.datetime "updated_at",                                null: false
  end

  add_index "posts", ["accepted", "published_at"], name: "index_posts_on_accepted_and_published_at", using: :btree
  add_index "posts", ["updated_at"], name: "index_posts_on_updated_at", using: :btree

  create_table "projects", force: :cascade do |t|
    t.string   "title",       limit: 255,                   null: false
    t.text     "description", limit: 65535
    t.string   "image",       limit: 255
    t.string   "caption",     limit: 255
    t.string   "source_url",  limit: 255
    t.boolean  "accepted",                  default: false, null: false
    t.datetime "created_at",                                null: false
    t.datetime "updated_at",                                null: false
  end

  add_index "projects", ["updated_at"], name: "index_projects_on_updated_at", using: :btree

  create_table "social_accounts", force: :cascade do |t|
    t.integer "author_id",    limit: 4,   null: false
    t.integer "account_type", limit: 4,   null: false
    t.string  "url",          limit: 255, null: false
  end

  add_index "social_accounts", ["account_type", "author_id"], name: "index_social_accounts_on_account_type_and_author_id", unique: true, using: :btree

  create_table "taggings", force: :cascade do |t|
    t.integer  "tag_id",       limit: 4,   null: false
    t.integer  "subject_id",   limit: 4,   null: false
    t.string   "subject_type", limit: 255, null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "taggings", ["subject_type", "subject_id"], name: "index_taggings_on_subject_type_and_subject_id", using: :btree
  add_index "taggings", ["tag_id", "subject_id", "subject_type"], name: "index_taggings_on_tag_id_and_subject_id_and_subject_type", unique: true, using: :btree

  create_table "tags", force: :cascade do |t|
    t.string   "name",       limit: 255, null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
