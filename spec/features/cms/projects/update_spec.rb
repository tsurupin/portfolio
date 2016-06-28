require 'rails_helper'

feature 'Admin user updates the existing project', js: true do
  background { sign_in_and_redirect_to("/cms/projects/#{project.id}/edit") }
  after { page.execute_script('localStorage.clear()') }

  context 'when the project status is accepted' do
    given!(:project) { create(:project, accepted: true, title: 'old title') }
    scenario 'they fail to update the project owing to lack of description' do
      fill_in 'title', with: 'title'
      fill_in 'sourceUrl', with: 'http://google.com'
      fill_in 'Tag Name', with: 'sample'
      find("input[placeholder='Tag Name']").native.send_keys(:return)
      attach_file 'image', "#{Rails.root}/spec/fixtures/images/sample.png"
      click_on 'Update'
      expect(page).to have_content('Update Project')
    end
  end

  context 'when the project status is not accepted' do
    given!(:project) { create(:project, title: 'old title') }
    given!(:tagging) { create(:tagging, :subject_project, subject: project) }

    scenario 'they update the project, and see the title updated title' do
      fill_in 'title', with: 'new title'
      fill_in 'sourceUrl', with: 'http://google.com'
      fill_in 'Tag Name', with: 'sample'
      find("input[placeholder='Tag Name']").native.send_keys(:return)
      attach_file 'image', "#{Rails.root}/spec/fixtures/images/sample.png"
      click_on 'Update'
      expect(page).to have_css('h1', 'Projects')
      expect(page).to have_text('new title')
      expect(Project.last.source_url).to eq 'http://google.com'
    end
  end
end
