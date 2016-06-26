require 'rails_helper'

describe 'Admin user updates the author info', js: true do

  context 'when they fill in all the needed info' do
    scenario 'they see the updated author info' do
      author = create(:author)
      sign_in_and_redirect_to_with("/cms/about/edit", author: author)
      fill_in 'name', with: 'name'
      attach_file "image", "#{Rails.root}/spec/fixtures/images/sample.png"
      rich_texts = page.all('.public-DraftEditor-content')
      rich_texts[0].set('description')
      rich_texts[1].set('introduction')
      click_on 'Update'
      expect(page).to have_css('section', 'Hello world!')
    end
  end
end