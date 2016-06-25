class Client::LatestPostsSerializer < ActiveModel::Serializer
  format_keys :lower_camel
  attributes :id, :title, :lead_sentence
end
