class PostTaggingSerializer < ActiveModel::Serializer
  attributes :tags

  def tags
    { id: object.id, text: object.name }
  end

end
