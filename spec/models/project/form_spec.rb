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
      context 'when description is nil' do
        it 'raises the error' do
          project = create(
            :project,
            image: File.new("#{Rails.root}/spec/fixtures/images/sample.png"),
            source_url: 'http://sample.com'
          )
          project_form = Project::Form.find(project.id)
          expect{ project_form.update!(accepted: true) }.to raise_error(ActiveRecord::RecordInvalid)
        end
      end

      context 'when description is not nil' do
        it 'raises the error' do
          project = create(
            :project,
            description: 'hoge',
            image: File.new("#{Rails.root}/spec/fixtures/images/sample.png"),
            source_url: 'http://sample.com'
          )
          project_form = Project::Form.find(project.id)
          expect{ project_form.update(accepted: true) }.to_not raise_error(ArgumentError)
        end
      end
    end

    context 'image' do
      context 'when image is nil' do
        it 'raises the error' do
          project = create(
            :project,
            description: 'hoge',
            source_url: 'http://sample.com'
          )
          project_form = Project::Form.find(project.id)
          expect{ project_form.update!(accepted: true) }.to raise_error(ActiveRecord::RecordInvalid)
        end
      end
    end

    context 'source_url' do
      context 'when source_url is nil' do
        it 'raises the error' do
          project = create(
            :project,
            description: 'hoge',
            image: File.new("#{Rails.root}/spec/fixtures/images/sample.png"),
          )
          project_form = Project::Form.find(project.id)
          expect{ project_form.update!(accepted: true) }.to raise_error(ActiveRecord::RecordInvalid)
        end
      end
    end

  end

  describe '#save_from_associations' do

  end
end
