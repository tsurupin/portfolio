require 'rails_helper'

feature 'User transits to the each page', js: true do
  background do
    create(:author, :updated)
    visit('/')
  end

  scenario 'they move to the index page' do
    find('h1', text: 'TOMOAKI TSURUTA').click
    expect(page).to have_css('h3', 'RecentPost')
  end

  scenario 'they move to the author page' do
    find("button[name='about-button']").click
    find("a[href='/about']").click
    expect(page).to have_css('h1', 'About')
  end

  scenario 'they move to the posts index page' do
    find("button[name='post-button']").click
    expect(page).to have_css('h1', 'Post')
  end

  scenario 'they move to the projects index page' do
    find("button[name='project-button']").click
    expect(page).to have_css('h1', 'Projects')
  end

  scenario 'they move to the git hub page' do
    find("button[name='git-hub-button']").click
    expect(current_path).to eq '/tsurupin'
  end
end
