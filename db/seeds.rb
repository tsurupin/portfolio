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

  author = FactoryGirl.create(:author, email: 'england0112@gmail.com', password: 'england0112')

  FactoryGirl.create(:social_account, author: author)

  item_types = %i(image twitter quote text heading sub_heading link)
  30.times do |i|
    project_tag = FactoryGirl.create(:tag)
    project = i.odd? ? FactoryGirl.create(:project) :  FactoryGirl.create(:project, :accepted)
    FactoryGirl.create(:tagging, subject_type: 'Project', subject_id: project.id, tag: project_tag)

    post_tag = FactoryGirl.create(:tag)
    post = i.odd? ? FactoryGirl.create(:post) :  FactoryGirl.create(:post, :accepted)
    FactoryGirl.create(:tagging, subject_type: 'Post', subject_id: post.id, tag: post_tag)

    4.times { FactoryGirl.create(:item, item_types[rand(7)], post: post) }
  end

end