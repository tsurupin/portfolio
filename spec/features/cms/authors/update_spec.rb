require 'rails_helper'

describe 'Update about page', js: true do

  context 'when all the needed info is sent' do
    scenario 'updates the about page' do
      author = create(:author)
      sign_in_and_redirect_to_with("/cms/about/edit", author: author)
      fill_in 'name', with: 'name'
      attach_file "image", "#{Rails.root}/spec/fixtures/images/sample.png"
      # TODO: figure out how to fill in draft js component
      # fill_in 'description', with: 'hogehoge'
      click_on 'Update'
      expect(page).to have_css('section', 'Hello world!')
    end
  end
end