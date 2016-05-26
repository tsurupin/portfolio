require 'rails_helper'

describe 'Sign up as author', js: true do
  scenario 'signs up' do
    visit '/cms/sign-up'
    fill_in 'name', with: 'samplename'
    fill_in 'email', with: 'sample@gmail.com'
    fill_in 'password', with: 'testpassword'
    fill_in 'passwordConfirmation', with: 'testpassword'
    click_on 'SignUp'
    expect(page).to have_css('section', 'Hello World!')
    expect(Author.last.name).to eq ('samplename')
  end

  # TODO: fix password confirmation validation
  xscenario 'fails to sign up with wrong password confirmation' do
    visit '/cms/sign-up'
    fill_in 'name', with: 'samplename'
    fill_in 'email', with: 'sample'
    fill_in 'password', with: 'testpassword'
    fill_in 'passwordConfirmation', with: 'hoge'
    click_on 'SignUp'
    expect(page).to have_css('h2', 'SignUp')
  end

  scenario 'moves to sign-in page when visiting other page' do
    visit '/cms/sign-up'
    visit '/cms/about'
    expect(page).to have_css('h2', 'SignIn')
  end
end