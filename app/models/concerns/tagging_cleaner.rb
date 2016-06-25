module TaggingCleaner
  extend ActiveSupport::Concern

  def delete_unnecessary_tags!(params)
    left_tag_ids =
      if params
        names = params.map(&:values).flatten
        Tag.where(name: names).pluck(:id)
      else
        []
      end
    deleted_tag_ids = tags.map(&:id) - left_tag_ids
    Tagging.where(subject_id: id, tag_id: deleted_tag_ids).find_each(&:destroy!)
  end
end
