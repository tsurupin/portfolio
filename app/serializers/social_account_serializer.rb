class SocialAccountSerializer < ActiveModel::Serializer
  format_keys :lower_camel
  attributes :id,
             :author_id,
             :account_type,
             :url
end
