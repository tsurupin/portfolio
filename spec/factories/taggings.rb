# == Schema Information
#
# Table name: taggings
#
#  id           :integer          not null, primary key
#  tag_id       :integer          not null
#  subject_id   :integer          not null
#  subject_type :string(255)      not null
#  created_at   :datetime
#  updated_at   :datetime
#

FactoryGirl.define do
  factory :tagging do
    association :tag, factory: :tag
    trait :post do
      subject_type 'Post'
      association :target, factory: :post
    end
    trait :project do
      subject_type 'Project'
      association :target, factory: :project
    end
  end
end
