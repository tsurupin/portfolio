class TagSerializer < ActiveModel::Serializer
  format_keys :lower_camel
  attributes :id, :name
end
