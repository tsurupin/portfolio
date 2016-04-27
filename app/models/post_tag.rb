# == Schema Information
#
# Table name: post_tags
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class PostTag < ActiveRecord::Base
  has_many :post_taggings, dependent: :destroy
end
