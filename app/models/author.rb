# == Schema Information
#
# Table name: authors
#
#  id                 :integer          not null, primary key
#  email              :string(255)      not null
#  encrypted_password :string(255)      not null
#  name               :string(255)      not null
#  image              :string(255)
#  introduction       :text(65535)
#  description        :text(65535)
#  access_token       :string(255)
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#

class Author < ActiveRecord::Base
  devise :database_authenticatable, :registerable, :rememberable, :validatable

  has_many :social_accounts, dependent: :destroy

  after_create :update_devise_token!

  validates :name, presence: true, uniqueness: { message: "%{value} is already used" }
  validates :email,
            presence: true,
            uniqueness: { message: "%{value} is already used" },
            email_format: { message: "%{value} is not a valid email" }
  validates :encrypted_password, presence: true, uniqueness: true
  after_update :delete_cache

  mount_uploader :image, AuthorImageUploader

  private
  def update_devise_token!
    self.access_token = "#{self.id}:#{Devise.friendly_token}"
    save!
  end

  def delete_cache
    Rails.cache.delete('cached_about')
  end
end
