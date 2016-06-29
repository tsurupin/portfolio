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
    title do
      new_title = Faker::Commerce.product_name
      new_title = Faker::Commerce.product_name while Project.exists?(title: new_title)
      new_title
    end

    trait :accepted do
      description '{"entityMap":{},"blocks":[{"key":"crvbi","text":"test","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'
      sequence(:image) { |n| File.new("#{Rails.root}/spec/fixtures/images/projects/#{(n%7)+1}.jpg") }
      sequence(:caption) { |n| (n % 5).zero? ? nil : Faker::Company.bs }
      source_url "https://github.com/tsurupin"
      accepted true

    end
  end
end
