# == Schema Information
#
# Table name: item_quotes
#
#  id          :integer          not null, primary key
#  description :text(65535)      not null
#  source_url  :text(65535)      not null
#

class ItemQuote < ActiveRecord::Base
  has_one :item, as: :target, dependent: :destroy

  validates :description, presence: true
  validates :source_url, format: { with: URI.regexp }
  validates :source_url, presence: true
end
