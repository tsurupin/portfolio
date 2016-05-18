# == Schema Information
#
# Table name: item_headings
#
#  id    :integer          not null, primary key
#  title :string(255)      not null
#

FactoryGirl.define do
  factory :item_heading do
    title  { Faker::Lorem.sentence }
  end
end
