require 'rails_helper'

feature 'Admin user sees the projects in preview mode', js: true do
  #background { sign_in_and_redirect_to('/cms/projects') }

  context 'when there is no corresponding project' do
    background { sign_in_and_redirect_to('/cms/projects') }
    scenario 'they see no content message' do
      visit '/cms/projects/preview'
      expect(page).to have_css('p', "we couldn't find any projects")
    end
  end

  context 'when there are some corresponding projects' do
    background do

      create(:project, :accepted, title: 'sample')
      create(:project, :accepted)
    end
    scenario 'they see all the corresponding projects' do
      sign_in_and_redirect_to('/cms/projects/preview')
      #visit '/cms/projects/preview'
      page.driver.browser.manage.logs.get("browser")
      expect(page).to have_css('h1', 'Projects')
      # wait_until { page.find('h1').visible? }
      expect(page).to have_text('sample')
      expect(page).to have_selector('h3', count: 2)

    end
  end
end