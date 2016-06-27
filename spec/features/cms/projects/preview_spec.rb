require 'rails_helper'

feature 'Admin user sees the projects in preview mode', js: true do
  context 'when there is no corresponding project' do
    scenario 'they see no content message' do
      sign_in_and_redirect_to('/cms/projects')
      visit '/cms/projects/preview'
      expect(page).to have_css('p', "we couldn't find any projects")
    end
  end

  context 'when there are some corresponding projects' do
    scenario 'they see all the corresponding projects' do
      create(:project, :accepted, title: 'sample')
      create(:project, :accepted)
      sign_in_and_redirect_to('/cms/projects/preview')
      expect(page).to have_css('h1', 'Projects')
      expect(page).to have_text('sample')
      expect(page).to have_selector('h3', count: 2)
    end

    # TODO: consider to add the transition in clicking tag in cms preview page
    xscenario 'they click tag and see all the corresponding projects' do
      project1 = create(:project, :accepted, title: 'sample')
      project2 = create(:project, :accepted)
      tag1 = create(:tag)
      create(:tagging, :subject_project, subject: project1, tag: tag1)
      create(:tagging, :subject_project, subject: project2)
      sign_in_and_redirect_to('/cms/projects/preview')
      expect(page).to have_css('h1', 'Projects')
      click_on tag1.name

      expect(page).to have_text('sample')
      expect(page).to have_selector('h3', count: 1)
    end
  end
end
