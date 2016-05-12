class SessionSerializer < ActiveModel::Serializer
  format_keys :lower_camel
  attributes :access_token
end