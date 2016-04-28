# == Schema Information
#
# Table name: item_links
#
#  id           :integer          not null, primary key
#  source_title :string(255)      not null
#  source_url   :text(65535)      not null
#

require 'rails_helper'

RSpec.describe ItemLink, type: :model do
  describe '#validation' do
    it { is_expected.to have_one(:item).dependent(:destroy) }
    it { is_expected.to validate_presence_of(:source_url) }
    it { is_expected.to validate_presence_of(:source_title) }
    context 'source_url' do
      subject { create(:item_link, source_url: url) }

      context 'when url is invalid' do
        let(:url) { 'hogehoge' }
        it { expect{ subject }.to raise_error(ActiveRecord::RecordInvalid) }
      end

      context 'when url is valid' do
        let(:url) { 'http://google.com' }
        it { is_expected.to be_truthy }
      end

    end
  end
end
