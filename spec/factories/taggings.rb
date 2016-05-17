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
    trait :subject_post do
      subject_type 'Post'
      association :subject, factory: :post
    end
    trait :subject_project do
      subject_type 'Project'
      association :subject, factory: :project
    end
  end
end
