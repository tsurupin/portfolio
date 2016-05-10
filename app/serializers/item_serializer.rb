class ItemSerializer < ActiveModel::Serializer
  format_keys :lower_camel
  attributes :id, :sort_rank, :title, :description, :imageURL, :sourceURL, :source_title, :authorImageURL, :author_screen_name, :author_name

  def title
    target_column(:title)
  end

  def description
    target_column(:description)
  end

  def imageURL
    target_column(:image_url)
  end

  def sourceURL
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

  def authorImageURL
    target_column(:author_image_url)
  end

  private

  def target_column(column_name)
    object.target.try(column_name)
  end

end
