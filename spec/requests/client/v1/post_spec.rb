require 'rails_helper'

RSpec.describe Client::Api::V1::PostsController, type: :request do
  describe 'Client Post API' do
    describe 'GET api/v1/posts' do
      context 'when page param is 1' do
        context 'when tag param exists' do
          it 'returns the corresponding posts' do
            posts = []
            30.times do |i|
              post = create(:post, :accepted, published_at: i.days.ago)
              create(:tagging, :subject_post, subject: post)
              posts << post
            end
            Timecop.return

            result = {
              'posts' => posts[-1..-1].map do |post|
                {
                  'id' => post.id,
                  'title' => post.title,
                  'leadSentence' => post.lead_sentence,
                  'publishedAt' => post.published_at.try(:strftime, '%b %d, %Y') || '-',
                  'tags' => post.tags.map { |tag| { 'id' => tag.id, 'name' => tag.name } }
                }
              end,
              'meta' => {
                'pagination' => {
                  'page' => 1,
                  'limit' => Post::PAGINATES_PER,
                  'total' => 1
                }
              }
            }

            request_params = { 'page' => 1, 'tag-id' => posts.last.tags.last.id }
            get api_v1_posts_path, request_params
            expect(response.status).to eq 200
            expect(JSON.parse(response.body)).to eq result
          end
        end

        context 'when tag param does not exist' do
          it 'returns the corresponding posts' do
            posts = []
            30.times do |i|
              post = create(:post, :accepted, published_at: i.days.ago)
              create(:tagging, :subject_post, subject: post)
              posts << post
            end
            Timecop.return

            result = {
              'posts' => posts[0..19].map do |post|
                {
                  'id' => post.id,
                  'title' => post.title,
                  'leadSentence' => post.lead_sentence,
                  'publishedAt' => post.published_at.try(:strftime, '%b %d, %Y') || '-',
                  'tags' => post.tags.map { |tag| { 'id' => tag.id, 'name' => tag.name } }
                }
              end,
              'meta' => {
                'pagination' => {
                  'page' => 1,
                  'limit' => Post::PAGINATES_PER,
                  'total' => 30
                }
              }
            }

            get api_v1_posts_path, 'page' => 1
            expect(response.status).to eq 200
            expect(JSON.parse(response.body)).to eq result
          end
        end
      end

      context 'when page param is 2' do
        it 'returns the corresponding posts' do
          posts = []
          30.times do |i|
            post = create(:post, :accepted, published_at: i.days.ago)
            create(:tagging, :subject_post, subject: post)
            posts << post
          end
          Timecop.return

          result = {
            'posts' => posts[20..-1].map do |post|
              {
                'id' => post.id,
                'title' => post.title,
                'leadSentence' => post.lead_sentence,
                'publishedAt' => post.published_at.try(:strftime, '%b %d, %Y') || '-',
                'tags' => post.tags.map { |tag| { 'id' => tag.id, 'name' => tag.name } }
              }
            end,
            'meta' => {
              'pagination' => {
                'page' => 2,
                'limit' => Post::PAGINATES_PER,
                'total' => 30
              }
            }
          }

          get api_v1_posts_path, 'page' => 2
          expect(response.status).to eq 200
          expect(JSON.parse(response.body)).to eq result
        end
      end
    end

    describe 'GET /api/v1/posts/:id' do
      it 'returns the error message because of wrong id' do
        get api_v1_post_path(1000)
        result = { 'errorMessage' => 'RecordNotFound' }
        expect(response.status).to eq 404
        expect(JSON.parse(response.body)).to eq result
      end

      it 'returns correct info' do
        prev_post = create(:post, :accepted, published_at: 10.days.ago)

        post = create(:post, :accepted, published_at: 5.days.ago)
        item_twitter = create(:item, :twitter, post: post)
        item_text = create(:item, :text, post: post)
        item_image = create(:item, :image, post: post)

        next_post = create(:post, :accepted, published_at: 1.day.ago)

        create(:tagging, :subject_post, subject: post)
        items_result = [
          {
            'id' => item_twitter.id,
            'targetId' => item_twitter.target_id,
            'targetType' => item_twitter[:target_type],
            'twitterId' => item_twitter.target.twitter_id
          },
          {
            'id' => item_text.id,
            'targetId' => item_text.target_id,
            'targetType' => item_text[:target_type],
            'description' => item_text.target.description
          },
          {
            'id' => item_image.id,
            'targetId' => item_image.target_id,
            'targetType' => item_image[:target_type],
            'image' => item_image.target.image_url,
            'caption' => item_image.target.caption
          }
        ]

        result = {
          'title' => post.title,
          'publishedAt' => post.published_at.strftime('%b %d, %Y'),
          'prevId' => prev_post.id,
          'prevTitle' => prev_post.title,
          'nextId' => next_post.id,
          'nextTitle' => next_post.title,
          'items' => items_result,
          'tags' => post.tags.map do |tag|
            {
              'id' => tag.id,
              'name' => tag.name
            }
          end
        }

        get api_v1_post_path(post.id)
        expect(response.status).to eq 200
        expect(JSON.parse(response.body)).to eq result
      end
    end
  end
end
