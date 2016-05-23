require 'rails_helper'

feature "Toggle existing project's accepted status", js: true do

  # background {
  #   p Project.all
  #   sign_in_and_redirect_to("/cms/projects")
  # }
  after {
    page.execute_script("localStorage.clear()")
  }

  given!(:accepted_project) { create(:project, :accepted) }
  given!(:unaccepted_project) { create(:project, :accepted, accepted: false) }
  context 'when toggling true from false' do
    scenario 'toggles true from false' do
      sign_in_and_redirect_to("/cms/projects")

      save_and_open_page

      #find(:xpath, '*/ul[0]/li[0]/*/button').click

      #click_on('Unpublished')
      #expect(Project.find(accepted_project).accepted).to be_falsly
    end
  end

  # context 'when toggling false from true' do
  #   given!(:project_without_description) { create(:project) }
  #   scenario 'fails to toggle because of model validation' do
  #
  #   end
  #
  #   scenario 'toggles' do
  #
  #   end
  # end
end

