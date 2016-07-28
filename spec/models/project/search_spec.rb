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

RSpec.describe Project::Search, type: :model do
  describe '.client_search' do
    context 'when the options are existed' do
      it 'returns the corresponding tags' do
        tag = create(:tag)
        Timecop.freeze(10.days.ago)
        project1 = create(:project, accepted: true)
        create(:tagging, subject: project1, tag: tag)

        Timecop.return
        create(:project, accepted: true)
        create(:project, accepted: false)

        params = { tag_id: tag.id }

        expect(Project::Search.client_search(params).map(&:id)).to eq [project1.id]
      end
    end

    context 'when the options are blank' do
      it 'returns the corresponding tags' do
        Timecop.freeze(10.days.ago)
        project1 = create(:project, accepted: true)
        Timecop.return
        project2 = create(:project, accepted: true)
        create(:project, accepted: false)

        expect(Project::Search.client_search.map(&:id)).to eq [project2.id, project1.id]
      end
    end
  end

  describe '.related_by_tags' do
    context 'when the tag_id is nil' do
      it 'returns all the records' do
        tag = create(:tag)
        project = create(:project)
        create(:tagging, subject: project, tag: tag)

        irrelevant_project = create(:project)
        create(:tagging, subject: irrelevant_project)

        expect(Project::Search.related_by_tag.map(&:id)).to eq [project.id, irrelevant_project.id]
      end
    end

    context 'when the tag_id exists' do
      it 'returns the corresponding records' do
        tag = create(:tag)
        project = create(:project)
        create(:tagging, subject: project, tag: tag)

        irrelevant_project = create(:project)
        create(:tagging, subject: irrelevant_project)

        expect(Project::Search.related_by_tag(tag.id).map(&:id)).to eq [project.id]
      end

      it 'returns the empty array because of no corresponding records' do
        tag = create(:tag)

        irrelevant_project = create(:project)
        create(:tagging, subject: irrelevant_project)

        expect(Project::Search.related_by_tag(tag.id).map(&:id)).to eq []
      end
    end
  end

  describe '.accepted' do
    it 'returns the records of which accepted is true' do
      project1 = create(:project, accepted: true)
      create(:project, accepted: false)
      expect(Project::Search.accepted.map(&:id)).to eq [project1.id]
    end
  end

  describe '.latest' do
    it 'returns the records in descending order by updated_at' do
      Timecop.freeze(10.days.ago)
      old_project = create(:project)
      Timecop.return
      new_project = create(:project)
      expect(Project::Search.latest.map(&:id)).to eq [new_project.id, old_project.id]
    end
  end
end
