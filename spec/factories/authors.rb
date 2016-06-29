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

description = "{\"entityMap\":{\"0\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"http://google.com\"}},\"1\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"http://google.com\"}}},\"blocks\":[{\"key\":\"dcv0i\",\"text\":\"Fruit blessed second give were. Created you're. Creepeth one yielding seas over. And earth. Firmament whales. Bearing darkness seasons from creepeth may evening. Second saying fowl, of creeping set man good tree all i. Divide seed have. Created sixth bring. Second meat.Gathering one creepeth seas isn't were void bearing us cattle. Divided whales so days. Female winged first bearing you'll deep.Rule open darkness days us rule saw. \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":5,\"style\":\"BOLD\"},{\"offset\":92,\"length\":16,\"style\":\"UNDERLINE\"},{\"offset\":92,\"length\":16,\"style\":\"ITALIC\"}],\"entityRanges\":[{\"offset\":258,\"length\":12,\"key\":0}]},{\"key\":\"9sdri\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[]},{\"key\":\"8d6hq\",\"text\":\"Two greater female deep bring his be saw Days beginning which gathering from appear him Bearing very earth you're, meat there tree tree Abundantly hath great let you, female moveth. Firmament.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[{\"offset\":88,\"length\":7,\"key\":1}]}]}"
introduction = "{\"entityMap\":{\"0\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"http://google.com\"}}},\"blocks\":[{\"key\":\"5v2be\",\"text\":\"Herb sixth stars saying midst fifth he let bring green, isn't won't behold morning creepeth living Were man us set over signs whose morning. Fish stars so wherein bring which thing midst fruitful gathered land, land under you'll.Seasons. Land place bring deep abundantly. Under, them earth, fifth. Form wherein one place behold Their, own beginning. Bearing multiply fish be!!\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":238,\"length\":10,\"style\":\"BOLD\"},{\"offset\":350,\"length\":26,\"style\":\"UNDERLINE\"},{\"offset\":350,\"length\":26,\"style\":\"ITALIC\"}],\"entityRanges\":[{\"offset\":141,\"length\":10,\"key\":0}]}]}"
FactoryGirl.define do
  factory :author do
    name Faker::Name.name
    email Faker::Internet.email
    password Faker::Internet.password
    image File.new("#{Rails.root}/spec/fixtures/images/authors/author.jpg")
    trait :updated do
      introduction description
      description introduction
    end
  end
end


