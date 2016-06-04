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

  private
  def save_from_association!(params)
    self.description = params['description']
    self.save!
  end
end
