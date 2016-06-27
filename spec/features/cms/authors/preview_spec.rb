require 'rails_helper'

describe 'Admin user sees the about info in preview mode', js: true do
  context 'when they fill in all the needed info' do
    scenario 'they see the updated author info' do
      author = create(:author)
      sign_in_and_redirect_to_with('/cms/about', author: author)
      expect(page).to have_css('h1', 'About')
    end
  end
end
