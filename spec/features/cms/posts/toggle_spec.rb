require 'rails_helper'

feature "Admin user toggles the existing post's accepted status", js: true do
  context 'when toggling true from false' do
    scenario 'they see unaccepted icon and visible button' do
      create(:post, :accepted)
      sign_in_and_redirect_to('/cms/posts')
      expect(page).to have_css('h1', 'Post')
      within(:xpath, '//tbody/tr[1]') do
        find("button[class^='toggleButton']").click
        expect(page).to have_selector("svg[name='unaccepted-button']")
        expect(page).to have_selector("svg[name='visible-button']")
      end
    end
  end

  context 'when toggling false from true' do
    scenario 'they see accepted icon and invisible button' do
      create(:post, :accepted, accepted: false, published_at: 2.days.from_now)
      sign_in_and_redirect_to('/cms/posts')
      expect(page).to have_css('h1', 'Post')
      within(:xpath, '//tbody/tr[1]') do
        find("button[class^='toggleButton']").click
        expect(page).to have_selector("svg[name='accepted-button']")
        expect(page).to have_selector("svg[name='in-visible-button']")
      end
    end

    scenario 'they see published icon and invisible button' do
      create(:post, :accepted, accepted: false, published_at: 2.days.ago)
      sign_in_and_redirect_to('/cms/posts')
      expect(page).to have_css('h1', 'Post')
      within(:xpath, '//tbody/tr[1]') do
        find("button[class^='toggleButton']").click
        expect(page).to have_selector("svg[name='publishing-button']")
        expect(page).to have_selector("svg[name='in-visible-button']")
      end
    end
  end
end
