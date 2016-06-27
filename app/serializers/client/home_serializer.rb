class Client::HomeSerializer < ActiveModel::Serializer
  self.root = false
  format_keys :lower_camel
  attributes :introduction

  has_many :latest_posts, serializer: Client::LatestPostsSerializer
  has_one :latest_project, serializer: Client::LatestProjectSerializer
end
