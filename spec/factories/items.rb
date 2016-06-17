# == Schema Information
#
# Table name: items
#
#  id          :integer          not null, primary key
#  post_id     :integer          not null
#  sort_rank   :integer          not null
#  target_id   :integer          not null
#  target_type :string(255)      not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

FactoryGirl.define do
  factory :item do
    association :post, factory: :post
    sequence(:sort_rank) { |n| n + 1 }

    trait :twitter do
      association :target, factory: :item_twitter
      target_type 'ItemTwitter'
    end

    trait :image do
      association :target, factory: :item_image
      target_type 'ItemImage'
    end

    trait :text do
      association :target, factory: :item_text
      target_type 'ItemText'
    end
  end
end
