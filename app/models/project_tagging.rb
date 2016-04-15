# == Schema Information
#
# Table name: project_taggings
#
#  id             :integer          not null, primary key
#  project_id     :integer          not null
#  project_tag_id :integer          not null
#

class ProjectTagging < ApplicationRecord
  belongs_to :project, touch: true
  belongs_to :project_tagging
end
