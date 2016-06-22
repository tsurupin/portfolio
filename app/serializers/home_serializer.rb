class HomeSerializer < ActiveModel::Serializer
  self.root = false
  format_keys :lower_camel
  attributes :introduction
  # TODO: there are several useless params, so need to examine them
  has_many :latest_posts, serializer: PostsSerializer
  has_one :latest_project, serializer: ProjectSerializer


end