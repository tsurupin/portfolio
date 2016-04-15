# == Schema Information
#
# Table name: article_taggings
#
#  id             :integer          not null, primary key
#  article_id     :integer          not null
#  article_tag_id :integer          not null
#

class ArticleTagging < ApplicationRecord
  belongs_to :article, touch: true
  belongs_to :article_tag
end
