# == Schema Information
#
# Table name: article_tags
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class ArticleTag < ApplicationRecord
  has_many :article_taggings, dependent: :destroy
end
