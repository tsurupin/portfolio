# == Schema Information
#
# Table name: item_texts
#
#  id          :integer          not null, primary key
#  type        :integer          default("1"), not null # 1: normal text, 2: source_code
#  description :text(65535)      not null
#

FactoryGirl.define do
  factory :item_text do
    description 'text'
  end
end
