require 'rails_helper'

describe 'Admin user signs in to cms', js: true do
  let!(:author) { create(:author) }

  scenario 'they see the navigation bar' do
    visit '/cms/sign-in'
    save_and_open_page
    fill_in 'email', with: author.email
    fill_in 'password', with: author.password
    click_on 'SignIn'
    expect(page).to have_css('h1', 'Posts')
  end

  scenario 'they fail to sign in because of wrong password' do
    visit '/cms/sign-in'
    fill_in 'email', with: author.email
    fill_in 'password', with: 'hogehoge'
    click_on 'SignIn'
    expect(page).to have_css('button', 'SignIn')
  end
end
