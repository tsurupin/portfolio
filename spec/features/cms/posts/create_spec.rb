require 'rails_helper'

feature 'Admin user creates a new post', js: true do
  context 'when the necessary info is blank' do
    scenario 'they fail to create new post because of lack of title' do
      sign_in_and_redirect_to('/cms/posts/new')
      fill_in 'title', with: ''
      fill_in 'leadSentence', with: 'lead sentence'
      page.execute_script("document.getElementsByName('publishedAt').val = '2016-06-14'")
      fill_in 'Tag Name', with: 'sample'
      find("input[placeholder='Tag Name']").native.send_keys(:return)
      find("button[name='add-item-button']").click

      within(:xpath, '//form/div/ul') do
        buttons = all('button')
        buttons[0].click
      end

      within(:xpath, '//form/section/ul') do
        find('.public-DraftEditor-content').set('new description')
        submit_buttons = all('button')
        submit_buttons[1].click
      end

      within(:xpath, '//form/div/ul') do
        buttons = all('button')
        buttons[1].click
      end

      within(:xpath, '//form/section/ul') do
        attach_file 'image', "#{Rails.root}/spec/fixtures/images/sample.png"
        submit_buttons = all('button')
        submit_buttons[1].click
      end

      within(:xpath, '//form/div/ul') do
        buttons = all('button')
        buttons[2].click
      end

      within(:xpath, '//form/section/ul') do
        fill_in 'twitterId', with: 'https://twitter.com/t_th112/status/237464297993801728'
        submit_buttons = all('button')
        submit_buttons[1].click
      end

      within(:xpath, '//form/div/ul') do
        buttons = all('button')
        buttons[2].click
      end

      click_on 'Create'

      expect(page).to have_text('Enter title')
    end
  end

  scenario 'they create a new post, and see the title in the index page' do
    sign_in_and_redirect_to('/cms/posts/new')
    fill_in 'title', with: 'new title'
    fill_in 'leadSentence', with: 'lead sentence'

    fill_in 'Tag Name', with: 'sample'
    find("input[placeholder='Tag Name']").native.send_keys(:return)
    find("button[name='add-item-button']").click

    within(:xpath, '//form/div/ul') do
      buttons = all('button')
      buttons[0].click
      buttons[1].click
      buttons[2].click
    end

    within(:xpath, '//form/section/ul/li[1]') do
      find('.public-DraftEditor-content').set('new description')
      submit_buttons = all('button')
      submit_buttons[1].click
    end

    within(:xpath, '//form/section/ul/li[2]') do
      attach_file 'image', "#{Rails.root}/spec/fixtures/images/sample.png"
      submit_buttons = all('button')
      submit_buttons[1].click
    end

    within(:xpath, '//form/section/ul/li[3]') do
      fill_in 'twitterId', with: '237464297993801728'
      submit_buttons = all('button')
      submit_buttons[1].click
    end

    click_on 'Create'
    expect(page).to have_text('new title')
    expect(Post.last.items.size).to eq 3
  end
end
