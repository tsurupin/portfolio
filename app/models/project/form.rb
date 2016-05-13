# == Schema Information
#
# Table name: projects
#
#  id           :integer          not null, primary key
#  title        :string(255)      not null
#  description  :text(65535)
#  accepted     :boolean          default("0"), not null
#  published_at :datetime
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Project::Form < ActiveType::Record[Project]
  validates :description, presence: true, if: proc { |project| project.accepted }
  validates :image, presence: true, if: proc { |project| project.accepted }
  validates :source_url, presence: true, if: proc { |project| project.accepted }

  accepts_nested_attributes_for :project_taggings, reject_if: ->(attributes) { attributes['project_tag_id'].blank? }

end
