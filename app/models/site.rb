# == Schema Information
#
# Table name: sites
#
#  id          :integer          not null, primary key
#  description :text(65535)      not null
#  image       :string(255)      not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Site < ActiveRecord::Base

  validates :description, presence: true
  validates :image, presence: true

  mount_uploader :image, SiteImageUploader
end
