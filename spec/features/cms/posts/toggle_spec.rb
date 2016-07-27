require 'rails_helper'

feature "Admin user toggles the existing post's accepted status", js: true do
  context 'when toggling true from false' do
    scenario 'they see unaccepted icon and visible icon' do
      create(:post, :accepted)
      sign_in_and_redirect_to('/cms/posts')
      expect(page).to have_css('h1', 'Post')

      within(:xpath, '//tbody/tr[1]') do
        find("button[name='toggle-button']").click
        expect(page).to have_selector("svg[name='unaccepted-icon']")
        expect(page).to have_selector("svg[name='visible-icon']")
      end
    end
  end

  context 'when toggling false from true' do
    scenario 'they see accepted icon and invisible icon' do
      create(:post, :accepted, accepted: false, published_at: 2.days.from_now)
      sign_in_and_redirect_to('/cms/posts')
      expect(page).to have_css('h1', 'Post')
      within(:xpath, '//tbody/tr[1]') do
        find("button[name='toggle-button']").click
        expect(page).to have_selector("svg[name='accepted-icon']")
        expect(page).to have_selector("svg[name='in-visible-icon']")
      end
    end

    # TODO: cannot find toggle-button somehow, need to figure out the cause
    xscenario 'they see published icon and invisible icon' do
      create(:post, :accepted, accepted: false, published_at: 2.days.ago)
      sign_in_and_redirect_to('/cms/posts')
      expect(page).to have_css('h1', 'Post')
      within(:xpath, '//tbody/tr[1]') do
        save_and_open_page
        find("button[name='toggle-button]").click
        expect(page).to have_selector("svg[name='publishing-icon']")
        expect(page).to have_selector("svg[name='in-visible-icon']")
      end
    end
  end
end
