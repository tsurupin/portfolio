# == Schema Information
#
# Table name: social_accounts
#
#  id           :integer          not null, primary key
#  author_id    :integer          not null
#  account_type :integer          not null
#  url          :string(255)      not null
#

url_list = [
  'https://github.com/tsurupin',
  'https://www.facebook.com/tomoaki.tsuruta.7',
  'https://twitter.com/t_th112'
]
FactoryGirl.define do
  factory :social_account do
    association :author, factory: :author
    sequence(:url) { |i| url_list[i] }
    sequence(:account_type) { |i| SocialAccount.account_types.keys[i] }
  end
end
