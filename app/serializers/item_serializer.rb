class ItemSerializer < ActiveModel::Serializer
  format_keys :lower_camel
  attributes :id,
             :target_type,
             :sort_rank,
             :title,
             :description,
             :image_url,
             :source_url,
             :source_title,
             :author_image_url,
             :author_screen_name,
             :author_name

  def title
    target_column(:title)
  end

  def description
    target_column(:description)
  end

  def image_url
    target_column(:image_url)
  end

  def source_url
    target_column(:source_url)
  end

  def source_title
    target_column(:source_title)
  end

  def author_screen_name
    target_column(:author_screen_name)
  end

  def author_name
    target_column(:author_name)
  end

  def author_image_url
    target_column(:author_image_url)
  end

  private

  def target_column(column_name)
    object.target.try(column_name)
  end

end
