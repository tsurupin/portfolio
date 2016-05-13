# == Schema Information
#
# Table name: project_tags
#
#  id         :integer          not null, primary key
#  name       :string(255)      not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class ProjectTag < ActiveRecord::Base
  has_many :project_taggings, dependent: :destroy

  validates :name, presence: true, uniqueness: true
end
