require 'rails_helper'

RSpec.describe Project, type: :model do
  describe '#validation' do
    subject { create(:project) }
    it { is_expected.to have_many(:project_taggings).dependent(:destroy) }
    it { is_expected.to have_many(:project_tags).through(:project_taggings) }
    it { is_expected.to validate_presence_of(:title) }
    it { is_expected.to validate_uniqueness_of(:title) }
  end

end