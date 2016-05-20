require 'rails_helper'

describe 'Update about page', js: true do

  background { sign_in_and_redirect_to("/cms/about/edit", author: author) }
  after { page.execute_script("localStorage.clear()") }

  given!(:author) { create(:author) }
  context 'when all the needed info is sent' do
    scenario 'updated the about page' do
      fill_in 'description', with: 'hogehoge'
      fill_in 'author_name', with: 'name'
      click_on 'Update'
      expect(page).to have_css('h2', 'About me')
    end
  end
end