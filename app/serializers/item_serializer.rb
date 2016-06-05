class ItemSerializer < ActiveModel::Serializer
  format_keys :lower_camel
  attributes :id,
             :target_id,
             :target_type,
             :sort_rank,
             :description,
             :image,
             :caption,
             :twitter_id


  def target_type
    object[:target_type]
  end

  def description
    target_column(:description)
  end

  def image
    target_column(:image_url)
  end

  def caption
    target_column(:caption)
  end

  def twitter_id
    target_column(:twitter_id)
  end

  private

  def target_column(column_name)
    object.target.try(column_name)
  end

end
