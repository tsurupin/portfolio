require 'rails_helper'

feature 'update existing project', js: true do
  given!(:author) { create(:author, email: 'sample@gmail.com', password: 'sampletest') }

  background do
    sign_in(author)
    visit "/cms/projects/#{project.id}/edit"
  end

  after do
    page.execute_script("localStorage.clear()")
  end

  context 'when the project status is accepted' do
    given!(:project) { create(:project, accepted: true) }
    scenario "fails to update the project owing to lack of description" do
      fill_in 'title', with: 'title'
      fill_in 'sourceUrl', with: 'http://google.com'
      fill_in 'sampleUrl', with: 'http://google.com'
      fill_in 'Enter Tag Name', with: 'sample'
      find("input[placeholder='Enter Tag Name']").native.send_keys(:return)
      attach_file "image", "#{Rails.root}/spec/fixtures/images/sample.png"
      click_on 'Update'
      sleep 1
      expect(page).to have_content('Update Project')
    end
  end

  context 'when the project status is not accepted' do
    given!(:project) { create(:project, title: 'test title') }
    given!(:tagging) { create(:tagging, :subject_project, subject_id: project.id) }

    scenario "updates the project successfully" do
      fill_in 'sourceUrl', with: 'http://google.com'
      fill_in 'sampleUrl', with: 'http://google.com'
      fill_in 'Enter Tag Name', with: 'sample'
      find("input[placeholder='Enter Tag Name']").native.send_keys(:return)
      attach_file "image", "#{Rails.root}/spec/fixtures/images/sample.png"
      click_on 'Update'

      sleep 1
      expect(page).to have_content('Projects')
      expect(Project.last.source_url).to eq 'http://google.com'
    end
  end
end