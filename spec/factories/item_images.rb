# == Schema Information
#
# Table name: item_images
#
#  id    :integer          not null, primary key
#  image :string(255)      not null
#

FactoryGirl.define do
  factory :item_image do
    image File.new("#{Rails.root}/spec/fixtures/images/sample.png")
  end
end
