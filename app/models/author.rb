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

  validates :name,
            presence: true
  validates :email,
            presence: true,
            email_format: { message: '%{value} is not a valid email' }
  validates :encrypted_password,
            presence: true

  before_create :ensure_record_singularity!
  after_create :generate_access_token!
  after_update :delete_cache

  mount_uploader :image, AuthorImageUploader

  private

  def generate_access_token!
    self.access_token = "#{id}:#{Devise.friendly_token}"
    save!
  end

  def ensure_record_singularity!
    fail ActiveRecord::RecordInvalid.new(self) if Author.count > 0
  end

  def delete_cache
    Rails.cache.delete('cached_about')
    Rails.cache.delete('cached_home')
  end
end
