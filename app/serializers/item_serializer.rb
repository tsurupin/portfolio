class ItemSerializer < ActiveModel::Serializer
  format_keys :lower_camel
  attributes :id,
             :target_id,
             :target_type,
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

  def filter(keys)
    case object.target_type
    when 'twitter' then keys - [:description, :caption, :image]
    when 'image' then keys - [:description, :twitter_id]
    when 'text' then keys - [:caption, :image, :twitter_id]
    end
  end

  private

  def target_column(column_name)
    object.target.try(column_name)
  end
end
