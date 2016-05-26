class HomeSerializer < ActiveModel::Serializer
  self.root = false
  format_keys :lower_camel
  attributes :description, :image, :latest_posts, :latest_projects
end