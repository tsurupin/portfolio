# == Schema Information
#
# Table name: item_quotes
#
#  id          :integer          not null, primary key
#  description :text(65535)      not null
#  source_url  :text(65535)      not null
#

FactoryGirl.define do
  factory :item_quote do
    description 'description'
    source_url 'http://google.com'
  end
end
