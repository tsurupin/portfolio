require 'rails_helper'

describe 'Admin user signs out', js: true do
  scenario 'they see the page for sign in' do
    sign_in_and_redirect_to('/cms')
    find("button[name='sign-out-button']").click
    expect(page).to have_css('h2', 'Sign In')
  end
end
