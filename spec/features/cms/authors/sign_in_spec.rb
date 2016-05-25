require 'rails_helper'


describe 'Sign in to cms as author', js: true do
  let!(:author) { create(:author) }

  scenario 'signs in to cms' do
    visit '/cms/sign-in'
    fill_in 'email', with: author.email
    fill_in 'password', with: author.password
    click_on 'SignIn'
    expect(page).to have_css('section', 'Hello World!')
  end

  scenario 'fails to sign in to cms with wrong password' do
    visit '/cms/sign-in'
    fill_in 'email', with: author.email
    fill_in 'password', with: 'hogehoge'
    click_on 'SignIn'
    expect(page).to have_css('button', 'SignIn')
  end
end