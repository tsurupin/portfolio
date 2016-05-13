# == Schema Information
#
# Table name: project_taggings
#
#  id          :integer          not null, primary key
#  project_id     :integer          not null
#  project_tag_id :integer          not null
#

FactoryGirl.define do
  factory :project_tagging do
    association :project, factory: :project
    association :project_tag, factory: :project_tag
  end
end
