# == Schema Information
#
# Table name: projects
#
#  id          :integer          not null, primary key
#  title       :string(255)      not null
#  description :text(65535)
#  image       :string(255)
#  caption     :string(255)
#  source_url  :string(255)
#  accepted    :boolean          default("0"), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

description1 = "{\"entityMap\":{\"0\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"http://google.com\"}}},\"blocks\":[{\"key\":\"dpjs5\",\"text\":\"Is creature beast one. Upon them open. The you'll. Creature him days behold can't grass said greater, meat forth you're sea multiply it be herb give she'd very. Of first a thing i heaven replenish. Fruit heaven sixth.Herb. I be their firmament female gathering living. \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[{\"offset\":198,\"length\":5,\"key\":0}]},{\"key\":\"3deuv\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[]},{\"key\":\"bsc1v\",\"text\":\"Their heaven good replenish whose Whales night. Earth wherein them waters shall rule gathering very hath upon they're darkness divide Upon fifth also waters had saying creepeth he from upon moveth Seas appear make.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":67,\"length\":6,\"style\":\"ITALIC\"},{\"offset\":118,\"length\":8,\"style\":\"BOLD\"}],\"entityRanges\":[]}]}"
description2 = "{\"entityMap\":{},\"blocks\":[{\"key\":\"bbosl\",\"text\":\"Heaven you a subdue our. Winged fifth third forth fifth of moving years may their his itself had earth is abundantly of made day. You'll spirit. Blessed were gathered behold dominion rule is Made appear whales creepeth a gathering. \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":145,\"length\":42,\"style\":\"ITALIC\"},{\"offset\":145,\"length\":42,\"style\":\"UNDERLINE\"}],\"entityRanges\":[]},{\"key\":\"331gs\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[]},{\"key\":\"3s8kj\",\"text\":\"Lights moved dominion greater.He. Saw itself called fly beast bearing all shall won't morning brought won't signs. Be man fruitful forth night can't fruit said heaven was replenish hath. Give i fourth. Image night under moveth a stars from is.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":118,\"length\":3,\"style\":\"ITALIC\"},{\"offset\":187,\"length\":4,\"style\":\"BOLD\"}],\"entityRanges\":[]}]}"
description3 = "{\"entityMap\":{\"0\":{\"type\":\"LINK\",\"mutability\":\"MUTABLE\",\"data\":{\"url\":\"http://google.com\"}}},\"blocks\":[{\"key\":\"crvbi\",\"text\":\"Itself spirit. Shall you herb fifth you'll man called creeping itself midst green meatthe waters form itself he fly replenish, light great blessed replenish appear saw replenish have so air.Let. Fruitful it Let, face air in signs, for in void from gathered created that without lights together have doesn't gathering wherein. \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":76,\"length\":5,\"style\":\"BOLD\"},{\"offset\":86,\"length\":3,\"style\":\"ITALIC\"}],\"entityRanges\":[{\"offset\":194,\"length\":16,\"key\":0}]},{\"key\":\"3h5qn\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[]},{\"key\":\"frcnd\",\"text\":\"Two the set. Bring seed you'll bearing lights. Face and. She'd, firmament. Said form made multiply the is. Isn't the us beginning. Our moving Divided. Female for.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[]}]}"
descriptions = [description1, description2, description3]

FactoryGirl.define do
  factory :project do
    title do
      new_title = Faker::Commerce.product_name
      new_title = Faker::Commerce.product_name while Project.exists?(title: new_title)
      new_title
    end

    trait :accepted do
      sequence(:image) { |n| File.new("#{Rails.root}/spec/fixtures/images/projects/#{(n%7)+1}.jpg") }
      sequence(:caption) { |n| (n % 5).zero? ? nil : Faker::Company.bs }
      source_url "https://github.com/tsurupin"
      accepted true
      description do
        random_i = rand(3)
        descriptions[random_i]
      end
    end
  end
end
