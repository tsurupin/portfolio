# == Schema Information
#
# Table name: item_twitters
#
#  id         :integer          not null, primary key
#  twitter_id :string(255)      not null
#

FactoryGirl.define do
  factory :item_twitter do
    twitter_id '463440424141459456'
  end
end
