# == Schema Information
#
# Table name: item_links
#
#  id           :integer          not null, primary key
#  source_title :string(255)      not null
#  source_url   :text(65535)      not null
#

class ItemLink < ActiveRecord::Base
  has_one :item, as: :target, dependent: :destroy

  validates :source_title, presence: true
  validates :source_url,
            presence: true,
            format: { with: URI.regexp, message: "%{value} does not appear to be a valid URL" }
end
