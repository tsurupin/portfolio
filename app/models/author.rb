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
  devise :database_authenticatable, :registerable, :rememberable, :validatable
  has_many :social_accounts, dependent: :destroy

  after_create :update_devise_token!

  validates :name, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true, email_format: { message: 'is not valid address' }

  mount_uploader :image, AuthorImageUploader

  private
  def update_devise_token!
    self.access_token = "#{self.id}:#{Devise.friendly_token}"
    save!
  end
end
