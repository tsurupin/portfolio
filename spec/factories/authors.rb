# == Schema Information
#
# Table name: authors
#
#  id                 :integer          not null, primary key
#  email              :string(255)      not null
#  encrypted_password :string(255)      not null
#  name               :string(255)      not null
#  image              :string(255)
#  introduction       :text(65535)
#  description        :text(65535)
#  access_token       :string(255)
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#

FactoryGirl.define do
  factory :author do
    sequence(:name) { Faker::Name.name }
    sequence(:email) { Faker::Internet.email }
    sequence(:password) { SecureRandom.hex }
    trait :updated do
      introduction '{"entityMap":{},"blocks":[{"key":"crvbi","text":"test","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'
      description '{"entityMap":{},"blocks":[{"key":"crvbi","text":"test","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'
    end
  end
end
