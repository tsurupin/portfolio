# == Schema Information
#
# Table name: social_accounts
#
#  id        :integer          not null, primary key
#  author_id :integer          not null
#  name      :string           not null
#  url       :string           not null
#  image     :string           not null
#

class SocialAccount < ApplicationRecord
  belongs_to :social_account, touch: true
  validates :name, presence: true
  validates :url, presence: true
  validates :author, presence: true

  mount_uploader :image, SocialAccountImageUploader
end
