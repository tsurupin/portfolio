# == Schema Information
#
# Table name: item_twitters
#
#  id         :integer          not null, primary key
#  twitter_id :string(255)      not null
#
tweets = %w(
  746094459834667008 742451468335239168 747215944477380608 728409530720210944
  708567021122772992 707621349020160000 747619686167130112 747209476453761024
  743533407464939521 738553570308411397
)
FactoryGirl.define do
  factory :item_twitter do
    sequence(:twitter_id) { |n| tweets[n%10] }
  end
end
