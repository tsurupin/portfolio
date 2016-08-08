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

class Project < ActiveRecord::Base
  has_many :taggings, as: :subject, dependent: :destroy
  has_many :tags, through: :taggings

  validates :title, presence: true, uniqueness: { message: '%{value} is already used' }

  after_save :delete_cache
  mount_uploader :image, ProjectImageUploader

  private

  def delete_cache
    Rails.cache.delete('cached_home')
    Rails.cache.delete_matched(/cached_projects\?tag_id=\w*/)
  end
end
