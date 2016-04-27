# == Schema Information
#
# Table name: projects
#
#  id          :integer          not null, primary key
#  title       :string(255)      not null
#  description :text(65535)      not null
#  image       :string(255)      not null
#  sample_url  :string(255)
#  source_url  :string(255)
#  accepted    :boolean          default("0"), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Project < ActiveRecord::Base
  has_many :project_taggings, dependent: :destroy
  has_many :project_tags, through: :project_taggings

  validates :title, presence: true

  mount_uploader :image, ProjectImageUploader
end
