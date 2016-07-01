require 'rails_helper'

feature 'User transits to the post index page', js: true do
  context 'when there are no corresponding posts' do
    scenario 'they see no content message' do
      visit('/posts')
      expect(page).to have_css('p', "we couldn't find any posts")
    end
  end

  context 'when there are some corresponding posts' do
    scenario 'they see the corresponding posts' do
      21.times do |i|
        create(:post, :accepted, published_at: i.days.ago)
      end
      oldest_post = Post.last
      latest_post = Post.first
      visit('/posts')

      expect(page).not_to have_text(oldest_post.title)
      expect(page).to have_text(latest_post.title)
    end

    scenario 'they see the corresponding posts' do
      post = create(:post, :accepted)
      visit('/posts')
      expect(page).to have_css('h1', 'Posts')
      click_link post.title
      expect(page).to have_css('h1', post.title)
    end

    # NOTE: cannot test well because of infinity loading
    xscenario 'they see the corresponding posts with page' do
      21.times do |i|
        create(:post, :accepted, published_at: i.days.ago)
      end
      oldest_post = Post.last
      latest_post = Post.first
      visit('/posts?page=2')
      expect(page).to have_css('h1', 'Posts')
      expect(page).to have_text(oldest_post.title)
      expect(page).not_to have_text(latest_post.title)
    end

    scenario 'they click tag, and see the posts associated with the tag' do
      posts = []
      tags = []
      2.times do |i|
        posts << create(:post, :accepted, published_at: i.days.ago)
        tags << create(:tag)
        create(:tagging, :subject_post, subject: posts[i], tag: tags[i])
      end
      visit('/posts')
      expect(page).to have_css('h1', 'Posts')
      click_link tags[0].name
      expect(page).to have_text(posts[0].title)
      expect(page).to have_selector('h3', count: 1)
    end
  end
end
