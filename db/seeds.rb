# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

if Rails.env.development?

end


ActiveRecord::Base.transaction do

  author = FactoryGirl.create(:author,
                              email: Settings.author.email,
                              password: Settings.author.password,
                              description: Settings.author.description,
                              introduction: Settings.author.introduction
  )

  FactoryGirl.create(:social_account, author: author)

  item_types = %i(image twitter text)
  30.times do |i|
    project_tag = FactoryGirl.create(:tag)
    project = i.odd? ? FactoryGirl.create(:project) :  FactoryGirl.create(:project, :accepted)
    FactoryGirl.create(:tagging, subject_type: 'Project', subject_id: project.id, tag: project_tag)

    post_tag = FactoryGirl.create(:tag)
    post = i.odd? ? FactoryGirl.create(:post) :  FactoryGirl.create(:post, :accepted)
    FactoryGirl.create(:tagging, subject_type: 'Post', subject_id: post.id, tag: post_tag)

    4.times { FactoryGirl.create(:item, item_types[rand(3)], post: post) }
  end

end