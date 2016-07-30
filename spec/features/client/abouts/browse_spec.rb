require 'rails_helper'

feature 'User sees the about page', js: true do
  scenario 'they see the author info' do
    create(:author)
    visit('/about')
    expect(page).to have_css("h1", "About")
  end
end
