# == Schema Information
#
# Table name: authors
#
#  id                 :integer          not null, primary key
#  email              :string(255)      default(""), not null
#  encrypted_password :string(255)      default(""), not null
#  name               :string(255)      not null
#  image              :string(255)
#  description        :text(65535)
#  access_token       :string(255)
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#

class Author < ActiveRecord::Base
  devise :database_authenticatable, :registerable, :rememberable, :validatable

  PERMITTED_ATTRIBUTES = [
    :name, :email, :password, :password_confirmation, :github_url,
    social_accounts_attributes: [ :id, :name, :url, :image ]
  ]

  has_many :social_accounts, dependent: :destroy

  accepts_nested_attributes_for :social_accounts, reject_if: ->(attributes) { attributes['name'].blank? || attributes['url'].blank?}

  after_create :update_devise_token!

  validates :name, presence: true, uniqueness: true
  validates :github_url, presence: true, uniqueness: true, allow_blank: true
  validates :email, presence: true, uniqueness: true, email_format: { message: 'is not valid address' }

  mount_uploader :image, AuthorImageUploader

  private
  def update_devise_token!
    self.access_token = "#{self.id}:#{Devise.friendly_token}"
    save!
  end
end
