require 'rails_helper'

feature 'User sees the about page', js: true do
  scenario 'they see the author info' do
    author = create(:author)
    social_account = create(:social_account, author: author)
    visit('/about')
    expect(page).to have_css("a[href='#{social_account.url}'")
  end
end
