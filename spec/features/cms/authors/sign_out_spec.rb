require 'rails_helper'

describe 'Sign out', js: true do

  scenario 'signs out' do
    sign_in_and_redirect_to("/cms")
    find("button[name='signOut']").click
    expect(page).to have_css('h2', 'Sign In')
  end
end