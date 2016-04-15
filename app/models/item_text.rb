# == Schema Information
#
# Table name: item_texts
#
#  id          :integer          not null, primary key
#  type        :integer          default("1"), not null # 1: normal text, 2: source_code
#  description :text             not null
#

class ItemText < ApplicationRecord
  has_one :item, as: :target, dependent: :destroy
  validates :type, presence: true
  validates :description, presence: true

  enum type: { normal: 1, code: 2 }
end
