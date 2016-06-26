# == Schema Information
#
# Table name: item_texts
#
#  id          :integer          not null, primary key
#  description :text(65535)      not null
#

FactoryGirl.define do
  factory :item_text do
    description "{\"entityMap\":{},\"blocks\":[{\"key\":\"crvbi\",\"text\":\"test\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[]}]}"
  end
end
