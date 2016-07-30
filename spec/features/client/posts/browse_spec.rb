require 'rails_helper'

feature 'User sees the post page', js: true do
  context 'when there is no post url' do
    it 'they see the not found page' do
      visit('posts/1000')
      expect(page).to have_css('h1', 'Sorry, but this page does not exist.')
    end
  end

  context 'when there is the corresponding page' do
    scenario 'they see the items associated with the post' do
      post = create(:post, :accepted)
      create(:item, :image, post: post)
      create(:item, :text, post: post)
      create(:item, :twitter, post: post)
      visit("posts/#{post.id}")

      expect(page).to have_selector("img")
      expect(page).to have_css '.public-DraftEditor-content'
      expect(page).to have_css 'twitterwidget'
    end

    scenario 'they see the next post title, and  move to the next post' do
      post = create(:post, :accepted, published_at: 2.days.ago)
      next_post = create(:post, :accepted, published_at: 1.day.ago)
      create(:post, :accepted, published_at: 1.day.from_now)

      visit("posts/#{post.id}")
      click_link next_post.title
      expect(page).to have_css('h1', next_post.title)
    end

    scenario 'they see the previous post title, and  move to the previous post' do
      post = create(:post, :accepted, published_at: 2.days.ago)
      prev_post = create(:post, :accepted, published_at: 3.days.ago)
      create(:post, :accepted, published_at: 4.days.ago, accepted: false)

      visit("posts/#{post.id}")
      click_link prev_post.title
      expect(page).to have_css('h1', prev_post.title)
    end

    scenario 'they click the associated tag, and  see the posts associated with the tag' do
      post = create(:post, :accepted, published_at: 2.days.ago)
      tag = create(:tag)
      same_tag_post = create(:post, :accepted)
      unaccepted_same_tag_post = create(:post)
      different_tag_post = create(:post, :accepted)
      create(:tagging, :subject_post, subject: post, tag: tag)
      create(:tagging, :subject_post, subject: same_tag_post, tag: tag)
      create(:tagging, :subject_post, subject: unaccepted_same_tag_post, tag: tag)
      create(:tagging, :subject_post, subject: different_tag_post)

      visit("posts/#{post.id}")
      click_link tag.name
      expect(page).to have_css('h1', 'Posts')
      expect(page).to have_selector('h3', count: 2)
      expect(page).to have_text(same_tag_post.title)
      expect(page).not_to have_text(unaccepted_same_tag_post.title)
      expect(page).not_to have_text(different_tag_post.title)
    end
  end
end
