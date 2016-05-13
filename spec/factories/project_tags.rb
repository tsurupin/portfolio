# == Schema Information
#
# Table name: post_tags
#
#  id         :integer          not null, primary key
#  name       :string(255)      not null
#  created_at :datetime
#  updated_at :datetime
#

FactoryGirl.define do
  factory :project_tag do
    sequence(:name) { Faker::Name.title }
  end
end
