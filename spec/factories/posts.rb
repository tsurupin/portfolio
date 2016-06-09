# == Schema Information
#
# Table name: posts
#
#  id           :integer          not null, primary key
#  title        :string(255)      not null
#  accepted     :boolean          default("0"), not null
#  published_at :datetime
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

FactoryGirl.define do
  factory :post do
    title { Faker::Lorem.sentence }

    trait :accepted do
      published_at { Faker::Time.between(2.days.ago, Date.today, :all) }
      accepted true
    end
  end
end
