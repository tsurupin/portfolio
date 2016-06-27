# == Schema Information
#
# Table name: social_accounts
#
#  id           :integer          not null, primary key
#  author_id    :integer          not null
#  account_type :integer          not null
#  url          :string(255)      not null
#

require 'rails_helper'

RSpec.describe SocialAccount, type: :model do
  describe '#validation' do
    it { is_expected.to belong_to(:author).touch(true) }
    it { is_expected.to validate_presence_of(:author) }
    it { is_expected.to validate_presence_of(:url) }
    it { is_expected.to allow_value('http://google.com').for(:url) }
    it { is_expected.not_to allow_value('google.com').for(:url) }
    it { expect(create(:social_account)).to validate_uniqueness_of(:url) }
    it { is_expected.to validate_presence_of(:account_type) }
  end
end
