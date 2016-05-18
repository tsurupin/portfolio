require 'rails_helper'

feature 'create new project', js: true do
  given!(:author) { create(:author, email: 'sample@gmail.com', password: 'sampletest') }
  background do
    sign_in(author)
    visit '/cms/projects/new'
  end

  context 'when necessary values are lack' do

    scenario "fails to create new post successfully" do
      save_and_open_page
    end
  end

  # context 'when necessary values are filled' do
  #   scenario "creates new post successfully" do
  #
  #   end
  # end
end