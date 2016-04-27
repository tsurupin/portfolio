# == Schema Information
#
# Table name: post_tags
#
#  id         :integer          not null, primary key
#  name       :string(255)      not null
#  created_at :datetime
#  updated_at :datetime
#

class PostTag < ActiveRecord::Base
  has_many :post_taggings, dependent: :destroy
end
