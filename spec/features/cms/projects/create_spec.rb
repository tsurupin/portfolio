require 'rails_helper'

feature 'Admin user creates a new project', js: true do
  context 'when the necessary info is blank' do
    scenario 'they fail to create new project because of lack of title' do
      sign_in_and_redirect_to('/cms/projects/new')
      fill_in 'title', with: ''
      fill_in 'sourceUrl', with: 'http://google.com'
      fill_in 'Tag Name', with: 'sample'
      find("input[placeholder='Tag Name']").native.send_keys(:return)
      attach_file 'image', "#{Rails.root}/spec/fixtures/images/sample.png"
      find('.public-DraftEditor-content').set('new description')
      click_on 'Create'
      expect(page).to have_content('Create New Project')
    end
  end

  context 'when necessary info are filled' do
    scenario 'they see the new project created' do
      sign_in_and_redirect_to('/cms/projects/new')
      fill_in 'title', with: 'sample title'
      find('.public-DraftEditor-content').set('new description')
      fill_in 'sourceUrl', with: 'http://google.com'
      fill_in 'Tag Name', with: 'sample'
      find("input[placeholder='Tag Name']").native.send_keys(:return)
      attach_file 'image', "#{Rails.root}/spec/fixtures/images/sample.png"
      click_on 'Create'
      expect(page).to have_css('h1', 'Projects')
      expect(page).to have_text('sample title')
      expect(Project.last.title).to eq 'sample title'
      expect(Project.last.tags.map(&:name)).to eq ['sample']
    end
  end
end
