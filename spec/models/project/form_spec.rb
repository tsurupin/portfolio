# == Schema Information
#
# Table name: projects
#
#  id          :integer          not null, primary key
#  title       :string(255)      not null
#  description :text(65535)
#  image       :string(255)
#  caption     :string(255)
#  source_url  :string(255)
#  accepted    :boolean          default("0"), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'rails_helper'

RSpec.describe Project::Form, type: :model do
  describe '#validations' do
    it { is_expected.to accept_nested_attributes_for(:taggings) }

    context 'description' do
      let(:project) { Project::Form.find(original_project.id) }
      context 'when description is nil' do
        let!(:original_project) { create(:project, image: File.new("#{Rails.root}/spec/fixtures/images/sample.png"), source_url: 'http://sample.com') }
        it { expect { project.update!(accepted: true) }.to raise_error { ArgumentError } }
      end

      context 'when description is not nil' do
        let!(:original_project) { create(:project, description: 'hoge', image: File.new("#{Rails.root}/spec/fixtures/images/sample.png"), source_url: 'http://sample.com') }
        it { expect { project.update!(accepted: true) }.not_to raise_error { ArgumentError } }
      end
    end

    context 'image' do
      let(:project) { Project::Form.find(original_project.id) }
      context 'when image is nil' do
        let!(:original_project) { create(:project, description: 'hoge', source_url: 'http://sample.com') }
        it { expect { project.update!(accepted: true) }.to raise_error { ArgumentError } }
      end

      context 'when image is not nil' do
        let!(:original_project) { create(:project, description: 'hoge', image: File.new("#{Rails.root}/spec/fixtures/images/sample.png"), source_url: 'http://sample.com') }
        it { expect { project.update!(accepted: true) }.not_to raise_error { ArgumentError } }
      end
    end

    context 'source_url' do
      let(:project) { Project::Form.find(original_project.id) }
      context 'when source_url is nil' do
        let!(:original_project) { create(:project, description: 'hoge', image: File.new("#{Rails.root}/spec/fixtures/images/sample.png")) }
        it { expect { project.update!(accepted: true) }.to raise_error { ArgumentError } }
      end

      context 'when source_url is not nil' do
        let!(:original_project) { create(:project, description: 'hoge', image: File.new("#{Rails.root}/spec/fixtures/images/sample.png"), source_url: 'http://sample.com') }
        it { expect { project.update!(accepted: true) }.not_to raise_error { ArgumentError } }
      end
    end
  end
end
