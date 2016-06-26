require 'rails_helper'

feature "Transit to the project form page", js: true do

  scenario 'they see the new form' do
    create(:project, :accepted)
    sign_in_and_redirect_to("/cms/projects")
    expect(page).to have_css('h1', 'Project')
    within(:xpath, "//section/a") do
      find('button').click
    end
    expect(page).to have_css('h1', 'Create New Project')
  end

  scenario 'they see the edit form' do
    create(:project, :accepted)
    sign_in_and_redirect_to("/cms/projects")
    expect(page).to have_css('h1', 'Project')
    within(:xpath, '//tbody/tr[1]') do
      find('a button').click
    end
    expect(page).to have_css('h1', 'Update Project')
  end
end
