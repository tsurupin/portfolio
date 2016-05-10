# == Schema Information
#
# Table name: item_texts
#
#  id          :integer          not null, primary key
#  type        :integer          default("1"), not null # 1: normal text, 2: source_code
#  description :text(65535)      not null
#

class ItemText < ActiveRecord::Base
  has_one :item, as: :target, dependent: :destroy
  validates :description, presence: true

end
