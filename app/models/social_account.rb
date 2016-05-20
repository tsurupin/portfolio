# == Schema Information
#
# Table name: social_accounts
#
#  id        :integer          not null, primary key
#  author_id :integer          not null
#  name      :string(255)      not null
#  url       :string(255)      not null
#  image     :string(255)      not null
#

class SocialAccount < ActiveRecord::Base
  belongs_to :author, touch: true
  validates :name, presence: true
  validates :url, presence: true
  validates :author, presence: true

  mount_uploader :image, SocialAccountImageUploader
end
