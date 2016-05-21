# == Schema Information
#
# Table name: authors
#
#  id                 :integer          not null, primary key
#  email              :string(255)      default(""), not null
#  encrypted_password :string(255)      default(""), not null
#  name               :string(255)      not null
#  image              :string(255)
#  description        :text(65535)
#  access_token       :string(255)
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#

FactoryGirl.define do
  factory :social_account do
    association :author, factory: :author
    url { Faker::Internet.url }
    name { Faker::Name.title }
    image File.new("#{Rails.root}/spec/fixtures/images/sample.png")
  end
end
