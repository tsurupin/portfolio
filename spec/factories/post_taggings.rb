# == Schema Information
#
# Table name: post_taggings
#
#  id          :integer          not null, primary key
#  post_id     :integer          not null
#  post_tag_id :integer          not null
#

FactoryGirl.define do
  factory :post_tagging do
    association :post, factory: :post
    association :post_tag, factory: :post_tag
  end
end
