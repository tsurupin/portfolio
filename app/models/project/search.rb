# == Schema Information
#
# Table name: projects
#
#  id          :integer          not null, primary key
#  title       :string(255)      not null
#  description :text(65535)
#  image       :string(255)
#  caption     :string(255)
#  source_url  :string(255)
#  accepted    :boolean          default("0"), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Project::Search < ActiveType::Record[Project]
  include RelatedTagSearch

  def self.client_search(options = {})
    eager_load(:tags)
      .accepted
      .related_by_tag(options[:tag_id])
      .latest
  end

  def self.accepted
    where(accepted: true)
  end

  def self.latest
    order(updated_at: :desc)
  end
end
