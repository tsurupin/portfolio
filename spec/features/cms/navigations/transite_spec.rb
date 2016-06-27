require 'rails_helper'

feature 'Admin user transits to the each page', js: true do
  background { sign_in_and_redirect_to('/cms') }

  scenario 'they move to the index page' do
    find('h1', text: 'TOMOAKI TSURUTA').click
    expect(page).to have_css('h1', 'Post')
  end

  scenario 'they move to the author edit page' do
    find("button[name='about-button']").click
    find("a[href='/cms/about/edit']").click
    expect(page).to have_css('h1', 'Update About')
  end

  scenario 'they move to the author preview page' do
    find("button[name='about-button']").click
    find("a[href='/cms/about']").click
    expect(page).to have_css('h1', 'About')
  end

  scenario 'they move to the posts index page' do
    find("button[name='post-button']").click
    expect(page).to have_css('h1', 'Post')
  end

  scenario 'they move to the projects edit page' do
    find("button[name='project-button']").click
    find("a[href='/cms/projects']").click
    expect(page).to have_css('h1', 'Project')
  end

  scenario 'they move to the projects preview page' do
    find("button[name='project-button']").click
    find("a[href='/cms/projects/preview']").click
    expect(page).to have_css('h1', 'Projects')
  end

  scenario 'they move to the git hub page' do
    find("button[name='git-hub-button']").click
    expect(current_path).to eq '/tsurupin'
  end

  scenario 'they logout' do
    find("button[name='sign-out-button']").click
    expect(page).to have_css('h1', 'Sign In')
  end
end
