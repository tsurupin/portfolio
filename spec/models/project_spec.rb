# == Schema Information
#
# Table name: projects
#
#  id          :integer          not null, primary key
#  title       :string(255)      not null
#  description :text(65535)
#  image       :string(255)
#  sample_url  :string(255)
#  source_url  :string(255)
#  accepted    :boolean          default("0"), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'rails_helper'

RSpec.describe Project, type: :model do
  describe '#validation' do
    subject { create(:project) }
    it { is_expected.to have_many(:taggings).dependent(:destroy) }
    it { is_expected.to have_many(:tags).through(:taggings) }
    it { is_expected.to validate_presence_of(:title) }
    it { is_expected.to validate_uniqueness_of(:title) }
  end

end
