require 'rails_helper'

feature "Toggle the existing project's accepted status", js: true do
  context 'when toggling true from false' do
    scenario 'they see unaccepted icon and visible icon' do
      create(:project, :accepted)
      sign_in_and_redirect_to('/cms/projects')
      expect(page).to have_css('h1', 'Project')
      within(:xpath, '//tbody/tr[1]') do
        find("button[name='toggle-button']").click
        expect(page).to have_selector("svg[name='unaccepted-icon']")
        expect(page).to have_selector("svg[name='visible-icon']")
      end
    end
  end

  context 'when toggling false from true' do
    scenario 'they see accepted icon and invisible icon' do
      create(:project, :accepted, accepted: false)
      sign_in_and_redirect_to('/cms/projects')
      expect(page).to have_css('h1', 'Project')
      save_and_open_page
      within(:xpath, '//tbody/tr[1]') do
        find("button[name='toggle-button']").click
        expect(page).to have_selector("svg[name='accepted-icon']")
        expect(page).to have_selector("svg[name='in-visible-icon']")
      end
    end
  end
end
