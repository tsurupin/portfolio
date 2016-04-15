# == Schema Information
#
# Table name: sites
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  description :text             not null
#  image       :string
#  source_url  :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Site < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true
end
