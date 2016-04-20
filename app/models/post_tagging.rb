# == Schema Information
#
# Table name: post_taggings
#
#  id             :integer          not null, primary key
#  post_id     :integer          not null
#  post_tag_id :integer          not null
#

class PostTagging < ApplicationRecord
  belongs_to :post, touch: true
  belongs_to :post_tag
end
