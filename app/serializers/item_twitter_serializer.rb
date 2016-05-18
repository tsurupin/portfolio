class ItemTwitterSerializer < ActiveModel::Serializer
  format_keys :lower_camel
  attributes :source_url, :author_image_url, :author_name, :author_screen_name, :description
end