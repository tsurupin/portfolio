# == Schema Information
#
# Table name: posts
#
#  id            :integer          not null, primary key
#  title         :string(255)      not null
#  accepted      :boolean          default("0"), not null
#  published_at  :datetime
#  lead_sentence :string(255)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

FactoryGirl.define do
  factory :post do
    title do
      new_title = Faker::Book.title
      new_title = Faker::Book.title while Post.exists?(title: new_title)
      new_title
    end


    trait :accepted do
      published_at { Faker::Date.between(1.years.ago, 30.days.from_now) }
      accepted true
      lead_sentence { Faker::Company.catch_phrase }
    end
  end
end
