class SessionSerializer < ActiveModel::Serializer
  format_keys :lower_camel
  attributes :email, :token_type, :author_id, :access_token

  def author_id
    object.id
  end

  def token_type
    'Bearer'
  end
end