# == Schema Information
#
# Table name: sites
#
#  id          :integer          not null, primary key
#  title       :string(255)      not null
#  description :text(65535)      not null
#  image       :string(255)
#  source_url  :string(255)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Site < ActiveRecord::Base
  validates :title, presence: true
  validates :description, presence: true
end
