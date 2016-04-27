# == Schema Information
#
# Table name: item_quotes
#
#  id           :integer          not null, primary key
#  description  :text             not null
#  source_title :string           not null
#  source_url   :text             not null
#

class ItemQuote < ActiveRecord::Base
  has_one :item, as: :target, dependent: :destroy

  validates :description, presence: true
  validates :source_title, presence: true
  validates :source_url, format: { with: URI.regexp }, if: proc { |i| i.source_url.present? }
  validates :source_url, presence: true
end
