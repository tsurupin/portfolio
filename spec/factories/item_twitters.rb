# == Schema Information
#
# Table name: item_twitters
#
#  id                 :integer          not null, primary key
#  source_url         :text(65535)      not null
#  description        :text(65535)      not null
#  author_image_url   :string(255)      not null
#  author_name        :string(255)      not null
#  author_screen_name :string(255)      not null
#

FactoryGirl.define do
  factory :item_twitter do
    twitter_id '463440424141459456'
  end
end
