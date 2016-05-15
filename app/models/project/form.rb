# == Schema Information
#
# Table name: projects
#
#  id          :integer          not null, primary key
#  title       :string(255)      not null
#  description :text(65535)
#  image       :string(255)
#  sample_url  :string(255)
#  source_url  :string(255)
#  accepted    :boolean          default("0"), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Project::Form < ActiveType::Record[Project]
  validates :description, presence: true, if: proc { |project| project.accepted }
  validates :image, presence: true, if: proc { |project| project.accepted }
  validates :source_url, presence: true, if: proc { |project| project.accepted }

  accepts_nested_attributes_for :taggings

end
