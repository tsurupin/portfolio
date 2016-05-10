# == Schema Information
#
# Table name: authors
#
#  id                     :integer          not null, primary key
#  email                  :string(255)      default(""), not null
#  encrypted_password     :string(255)      default(""), not null
#  reset_password_token   :string(255)
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  name                   :string(255)      not null
#  image                  :string(255)
#  description            :text(65535)
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#

class Author < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :timeoutable
  has_many :social_accounts, dependent: :destroy

  validates :name, presence: true, uniqueness: true
 # validates :email, presence: true, uniqueness: true, email_format: { message: 'is not valid address' }

  mount_uploader :image, AuthorImageUploader
end
