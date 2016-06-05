# == Schema Information
#
# Table name: taggings
#
#  id           :integer          not null, primary key
#  tag_id       :integer          not null
#  subject_id   :integer          not null
#  subject_type :string(255)      not null
#  created_at   :datetime
#  updated_at   :datetime
#

class Tagging < ActiveRecord::Base
  belongs_to :subject, polymorphic: true, touch: true
  belongs_to :tag

  validates :tag, presence: true
  validates :tag_id, uniqueness: { scope: [:subject_id, :subject_type] }

  delegate :name, to: :tag

  def self.by_tag(tag_id)
    where(tag_id: tag_id).order(updated_at: :desc)
  end

end
