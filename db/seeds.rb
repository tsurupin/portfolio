# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or FactoryGirl.created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.FactoryGirl.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.FactoryGirl.create(name: 'Emanuel', city: cities.first)


ActiveRecord::Base.transaction do


  author = FactoryGirl.create(
    :author,
    :updated,
    email: Settings.author.try(:email) || 'sample@gmail.com',
    password: Settings.author.try(:password) || 'sample_password'
  )

  unless Rails.env.production?
    4.times do
      FactoryGirl.create(:social_account, author: author)
    end

    tags = []
    21.times do
      tags << FactoryGirl.create(:tag)
    end

    item_types = %i(image twitter text)
    40.times do |i|
      post =
        if i % 10 == 0
          FactoryGirl.create(:post)
        else
          FactoryGirl.create(:post, :accepted)
        end

      FactoryGirl.create(:item, :text, post: post)
      (rand(10)+1).times do
        type = item_types[rand(3)]
        FactoryGirl.create(:item, type, post: post)
      end

      (rand(4)+1).times do
        begin
          tag_index = rand(21)
          FactoryGirl.create(:tagging, :subject_post, subject: post, tag: tags[tag_index])
        rescue
          retry
        end

      end
    end

    8.times do |i|
      project =
        if i % 5 == 0
          FactoryGirl.create(:project)
        else
          FactoryGirl.create(:project, :accepted)
        end

      (rand(4)+1).times do
        begin
          tag_index = rand(21)
          FactoryGirl.create(:tagging, :subject_project, subject: project, tag: tags[tag_index])
        rescue
          retry
        end
      end
    end
  end

end