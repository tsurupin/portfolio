# == Schema Information
#
# Table name: item_headings
#
#  id    :integer          not null, primary key
#  title :string(255)      not null
#

require 'rails_helper'

RSpec.describe ItemHeading, type: :model do
  describe '#validation' do
    it { is_expected.to have_one(:item).dependent(:destroy) }
    it { is_expected.to validate_presence_of(:title) }
  end
end
