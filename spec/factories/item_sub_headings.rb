# == Schema Information
#
# Table name: item_sub_headings
#
#  id    :integer          not null, primary key
#  title :string(255)      not null
#

FactoryGirl.define do
  factory :item_sub_heading do
    title 'subTitle'
  end
end
