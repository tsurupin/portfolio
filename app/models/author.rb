# == Schema Information
#
# Table name: authors
#
#  id          :integer          not null, primary key
#  name        :string           not null
#  image       :string
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Author < ApplicationRecord
  has_many :social_accounts, dependent: :destroy

  mount_uploader :image, AuthorImageUploader
end
