# == Schema Information
#
# Table name: authors
#
#  id          :integer          not null, primary key
#  name        :string(255)      not null
#  image       :string(255)
#  description :text(65535)
#  email       :string(255)      not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Author < ActiveRecord::Base
  has_many :social_accounts, dependent: :destroy

  validates :name, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true, email_format: { message: 'is not valid address' }

  mount_uploader :image, AuthorImageUploader
end
