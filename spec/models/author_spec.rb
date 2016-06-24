# == Schema Information
#
# Table name: posts
#
#  id           :integer          not null, primary key
#  title        :string(255)      not null
#  accepted     :boolean          default("0"), not null
#  published_at :datetime
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
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
      expect(author.access_token).to match(/1:\w*/)
    end
  end

  describe '#ensure_record_singularity!' do
    context 'when author record is already existed' do
      it 'raises record invalid error' do
        create(:author)
        expect{ create(:author) }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end

    context 'when author record is not existed yet' do
      it 'increments the record count' do
        expect{ create(:author) }.to change{ Author.count }.by(1)
      end
    end
  end

end
