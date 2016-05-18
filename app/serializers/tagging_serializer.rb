class TaggingSerializer < ActiveModel::Serializer
  attributes :text

  def text
    object.name
  end

end
