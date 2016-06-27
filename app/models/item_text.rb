# == Schema Information
#
# Table name: item_texts
#
#  id          :integer          not null, primary key
#  description :text(65535)      not null
#

class ItemText < ActiveRecord::Base
  has_one :item, as: :target, dependent: :destroy
  validates :description, presence: true

  def trim_attributes_and_save!(params)
    self.description = params['description']
    save!
  end
end
