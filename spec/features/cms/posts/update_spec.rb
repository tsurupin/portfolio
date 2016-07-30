require 'rails_helper'

feature 'Admin user updates the existing project', js: true do
  # TODO: the test result is unstable in CI, need to figure out to make it stable.
  xscenario 'they update the post, and see the updated title in the index page' do
    post = create(:post, :accepted)
    create(:item, :text, post: post)
    create(:tagging, :subject_post, subject: post)
    sign_in_and_redirect_to("/cms/posts/#{post.id}/edit")

    fill_in 'title', with: 'updated title'
    fill_in 'Tag Name', with: 'sample'
    find("input[placeholder='Tag Name']").native.send_keys(:return)

    find("button[name='add-item-button']").click

    within(:xpath, '//form/section/ul/li[1]') do
      find('button').click
    end

    expect(page).to have_css("span[name='edit-button']")
    find("span[name='edit-button']").click

    within(:xpath, '//form/section/ul/li[1]') do
      find('.public-DraftEditor-content').set('updated description')
      expect(page).to have_css("button[name='save-item-button']")
      find("button[name='save-item-button']").click
    end

    click_on 'Update'
    expect(page).to have_text('updated title')
  end

  # TODO : figure out how to test javascript action stably in capybara
  xscenario 'they delete the item associated with the post, and confirm the decrement' do
    post = create(:post, :accepted)
    create(:item, :twitter, post: post)
    create(:item, :text, post: post)
    create(:tagging, :subject_post, subject: post)
    sign_in_and_redirect_to("/cms/posts/#{post.id}/edit")
    expect(page).to have_css 'twitterwidget'

    within(:xpath, '//form/section/ul/li[2]') do
      find('button').click
    end

    find("span[name='edit-button']").click

    expect(page).to have_css("button[name='delete-item-button']")
    find("button[name='delete-item-button']").click

    within(:xpath, '//form/section/ul/li[1]') do
      find('button').click
    end

    expect(page).to have_css("span[name='edit-button']")
    find("span[name='edit-button']").click
    within(:xpath, '//form/section/ul/li[1]') do
      expect(page).to have_css("button[name='cancel-item-button']")
      find("button[name='cancel-item-button']").click
    end
    click_on 'Update'
    expect(page).to have_text(post.title)
    expect(Post.last.items.map(&:target_type)).to eq ['twitter']
  end

  # TODO: the test result is unstable in CI, need to figure out to make it stable.
  xscenario 'they move down the items order, and confirm the change' do
    post = create(:post, :accepted)
    item1 = create(:item, :twitter, post: post)
    item2 = create(:item, :text, post: post)
    item3 = create(:item, :image, post: post)
    create(:tagging, :subject_post, subject: post)
    sign_in_and_redirect_to("/cms/posts/#{post.id}/edit")


    expect(page).to have_css 'twitterwidget'

    within(:xpath, '//form/section/ul/li[1]') do
      find('button').click
    end

    find("span[name='bottom-button']").click
    sleep 3

    within(:xpath, '//form/section/ul/li[2]') do
      find('button').click
    end

    find("span[name='down-button']").click

    sleep 3

    click_on 'Update'
    expect(page).to have_text(post.title)
    expect(Post.last.items.map(&:id)).to eq [item2.id, item1.id, item3.id]
  end

  # TODO: the test result is unstable in CI, need to figure out to make it stable.
  xscenario 'they move up the items order, and confirm the change' do
    post = create(:post, :accepted)
    item1 = create(:item, :twitter, post: post)
    item2 = create(:item, :text, post: post)
    item3 = create(:item, :image, post: post)
    create(:tagging, :subject_post, subject: post)
    sign_in_and_redirect_to("/cms/posts/#{post.id}/edit")

    within(:xpath, '//form/section/ul/li[2]') do
      find('button').click
    end

    find("span[name='up-button']").click
    sleep 3

    within(:xpath, '//form/section/ul/li[3]') do
      find('button').click
    end

    find("span[name='top-button']").click

    sleep 3

    click_on 'Update'
    expect(page).to have_text(post.title)
    expect(Post.last.items.map(&:id)).to eq [item3.id, item2.id, item1.id]
  end
end
