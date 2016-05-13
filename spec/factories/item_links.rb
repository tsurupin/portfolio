# == Schema Information
#
# Table name: item_links
#
#  id           :integer          not null, primary key
#  source_title :string(255)      not null
#  source_url   :text(65535)      not null
#

FactoryGirl.define do
  factory :item_link do
    source_title  { Faker::Lorem.sentence }
    source_url 'http://google.com'
  end
end
