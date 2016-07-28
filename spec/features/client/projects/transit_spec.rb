require 'rails_helper'

feature 'User transits to the project index page', js: true do
  scenario 'they see the corresponding projects' do
    accepted_project1 = create(:project, :accepted)
    accepted_project2 = create(:project, :accepted)
    unaccepted_project = create(:project)
    visit('/projects')

    expect(page).to have_text(accepted_project1.title)
    expect(page).to have_text(accepted_project2.title)
    expect(page).not_to have_text(unaccepted_project.title)
  end

  scenario 'they click tag, and see the projects associated with the tag' do
    projects = []
    tags = []
    2.times do |i|
      projects << create(:project, :accepted)
      tags << create(:tag)
      create(:tagging, :subject_project, subject: projects[i], tag: tags[i])
    end
    visit('/projects')
    expect(page).to have_css('h1', 'Projects')
    click_link tags[0].name
    expect(page).to have_text(projects[0].title)
    expect(page).to have_selector('h3', count: 1)
    expect(page).not_to have_text(projects[1].title)
  end
end
