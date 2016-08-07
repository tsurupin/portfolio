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

require 'rails_helper'

RSpec.describe Author, type: :model do
  describe '#validation' do
    it { is_expected.to have_many(:social_accounts).dependent(:destroy) }
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:email) }
    it { is_expected.to validate_presence_of(:password) }
  end

  describe '#generate_devise_token!' do
    it 'inserts access_token' do
      author = create(:author, access_token: nil)
      expect(author.access_token).to match(/\d*:\w*/)
    end
  end

  describe '#ensure_record_singularity!' do
    context 'when author record is already existed' do
      it 'raises record invalid error' do
        create(:author)
        expect { create(:author) }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end

    context 'when author record is not existed yet' do
      it 'increments the record count' do
        expect { create(:author) }.to change { Author.count }.by(1)
      end
    end
  end
end
