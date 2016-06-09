# == Schema Information
#
# Table name: sites
#
#  id          :integer          not null, primary key
#  description :text(65535)      not null
#  image       :string(255)      not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

FactoryGirl.define do
  factory :site do
    description Faker::Lorem.sentence
    image File.new("#{Rails.root}/spec/fixtures/images/sample.png")
  end
end
