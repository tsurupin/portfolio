# == Schema Information
#
# Table name: social_accounts
#
#  id        :integer          not null, primary key
#  author_id :integer          not null
#  name      :string(255)      not null
#  url       :string(255)      not null
#

class SocialAccount < ActiveRecord::Base
  belongs_to :author, touch: true

  enum account_type: [:github, :facebook, :twitter, :linked_in ]

  validates :url, presence: true, uniqueness: true, format: { with: URI.regexp }
  validates :author, presence: true
  validates :account_type,
            presence: true,
            inclusion: { in: SocialAccount.account_types.keys },
            uniqueness: { message: "%{value} is already used" }

end
