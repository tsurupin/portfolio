# == Schema Information
#
# Table name: posts
#
#  id           :integer          not null, primary key
#  title        :string(255)      not null
#  accepted     :boolean          default("0"), not null
#  published_at :datetime
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

require 'rails_helper'

RSpec.describe Home, type: :model do
  describe '.initialize' do
    it 'includes author, posts, and project' do
      author = create(:author)
      posts = []
      Home::POST_NUMBER.times do |i|
        posts << create(:post, :accepted, published_at: i.days.ago)
      end

      Timecop.freeze(10.days.ago)
      create(:project, :accepted)
      Timecop.return
      latest_project = create(:project, :accepted)

      home = Home.new
      expect(home.introduction).to eq author.introduction
      expect(home.latest_posts.map(&:id)).to eq posts.map(&:id)
      expect(home.latest_project.id).to eq latest_project.id
    end
  end
end
