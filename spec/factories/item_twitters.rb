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
    source_url 'http://google.com'
    description 'description'
    author_name 'james'
    author_screen_name 'james_bond'
    author_image_url 'http://google.com'
  end
end
