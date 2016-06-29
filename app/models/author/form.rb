# frozen_string_literal: true
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

class Author::Form < ActiveType::Record[Author]
  include DataURIToImageConverter
  PERMITTED_ATTRIBUTES = [
    :name, :email, :password, :password_confirmation, :image, :description, :introduction,
    social_accounts_attributes: [:id, :author_id, :account_type, :url]
  ].freeze

  validates :description, presence: true
  validates :introduction, presence: true

  SOCIAL_ACCOUNTS_ATTRIBUTES = 'social_accounts_attributes'.freeze

  accepts_nested_attributes_for :social_accounts, reject_if: ->(attributes) { attributes['url'].blank? }

  def save(params)
    ActiveRecord::Base.transaction do
      delete_unnecessary_accounts!(params[SOCIAL_ACCOUNTS_ATTRIBUTES])
      if params['image']&.start_with?('data')
        params['image'] = convert_data_uri_to_upload(params['image'])
      end

      update!(params)
      true
    end
  rescue => e
    logger.error "error: #{e.message}, location: #{e.backtrace_locations}"
    false
  end

  def delete_unnecessary_accounts!(params)
    removed_ids = social_accounts.map(&:id) - (params || []).map { |key, _| key['id'].to_i }
    SocialAccount.where(id: removed_ids).find_each(&:destroy!)
  end
end
