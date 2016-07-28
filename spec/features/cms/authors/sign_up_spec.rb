require 'rails_helper'

describe 'Admin user creates an account', js: true do
  scenario 'they see navigation bar' do
    visit '/cms/sign-up'
    fill_in 'name', with: 'samplename'
    fill_in 'email', with: 'sample@gmail.com'
    fill_in 'password', with: 'testpassword'
    fill_in 'passwordConfirmation', with: 'testpassword'
    click_on 'SignUp'
    expect(page).to have_css('h1', 'Posts')
  end

  scenario 'they fail to sign up because of wrong password confirmation' do
    visit '/cms/sign-up'
    fill_in 'name', with: 'samplename'
    fill_in 'email', with: 'sample'
    fill_in 'password', with: 'testpassword'
    fill_in 'passwordConfirmation', with: 'hoge'
    click_on 'SignUp'
    expect(page).to have_css('h2', 'SignUp')
  end

  scenario 'they move to sign in page in visiting other page' do
    visit '/cms/sign-up'
    visit '/cms/posts'
    expect(page).to have_css('h2', 'Sign In')
  end
end
