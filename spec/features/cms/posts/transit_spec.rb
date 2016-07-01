require 'rails_helper'

feature 'Admin user transits to the post form page', js: true do
  context 'when there are no corresponding posts' do
    scenario 'they see no content message' do
      sign_in_and_redirect_to('/cms/posts')
      expect(page).to have_css('p', "we couldn't find any posts")
    end
  end

  scenario 'they see the new form' do
    sign_in_and_redirect_to('/cms/posts')
    expect(page).to have_css('h1', 'Post')
    within(:xpath, '//section/a') do
      find('button').click
    end
    expect(page).to have_css('h1', 'Create New Post')
  end

  scenario 'they see the preview form' do
    post = create(:post)
    sign_in_and_redirect_to('/cms/posts')
    expect(page).to have_css('h1', 'Post')
    within(:xpath, '//tbody/tr[1]') do
      buttons = all('a button')
      buttons[0].click
    end
    expect(page).to have_css('h1', post.title)
  end

  scenario 'they see the edit form' do
    create(:post, :accepted)
    sign_in_and_redirect_to('/cms/posts')
    expect(page).to have_css('h1', 'Post')
    within(:xpath, '//tbody/tr[1]') do
      buttons = all('a button')
      buttons[1].click
    end
    expect(page).to have_css('h1', 'Update Post')
  end
end
