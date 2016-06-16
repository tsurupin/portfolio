# == Schema Information
#
# Table name: projects
#
#  id          :integer          not null, primary key
#  title       :string(255)      not null
#  description :text(65535)
#  image       :string(255)
#  caption     :string(255)
#  source_url  :string(255)
#  accepted    :boolean          default("0"), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

FactoryGirl.define do
  factory :project do
    title { Faker::Lorem.sentence }

    trait :accepted do
      description { Faker::Lorem.paragraphs }
      image File.new("#{Rails.root}/spec/fixtures/images/sample.png")
      source_url 'http://google.com'
      accepted true
    end
  end
end
