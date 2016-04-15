# == Schema Information
#
# Table name: comments
#
#  id         :integer          not null, primary key
#  article_id :integer          not null
#  comment    :text             not null
#  reply_id   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Comment < ApplicationRecord
  belongs_to :article, touch: true
  belongs_to :reply, class_name: 'Comment'
end
