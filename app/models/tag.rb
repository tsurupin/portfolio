# == Schema Information
#
# Table name: tags
#
#  id         :integer          not null, primary key
#  name       :string(255)      not null
#  created_at :datetime
#  updated_at :datetime
#

class Tag < ActiveRecord::Base
  has_many :taggings, as: :subject, dependent: :destroy
  has_many :posts, through: :taggings
  has_many :ptojects, through: :taggings
  validates :name, presence: true, uniqueness: true

end
