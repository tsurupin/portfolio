# == Schema Information
#
# Table name: item_images
#
#  id      :integer          not null, primary key
#  image   :string(255)      not null
#  caption :string(255)
#

FactoryGirl.define do
  factory :item_image do
    sequence(:image) { |n| File.new("#{Rails.root}/spec/fixtures/images/item_images/#{(n%20)+1}.jpg") }
    trait :with_caption do
      sequence(:caption) { |n| (n % 5).zero? ? nil : Faker::StarWars.quote }
    end
  end
end
