class Cms::TaggingSerializer < ActiveModel::Serializer
  format_keys :lower_camel
  attributes :id, :text

  def text
    object.name
  end
end
