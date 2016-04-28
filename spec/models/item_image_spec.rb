# == Schema Information
#
# Table name: item_images
#
#  id    :integer          not null, primary key
#  image :string(255)      not null
#

require 'rails_helper'

RSpec.describe ItemImage, type: :model do
  describe '#validation' do
    it { is_expected.to have_one(:item).dependent(:destroy) }
  end
end
