module TaggingCleaner
  extend ActiveSupport::Concern

  def delete_unnecessary_tags!(params)
    names = params&.map(&:values).flatten
    tags_ids = Tag.where(name: names).pluck(:id)
    remove_ids = tags.map(&:id) - tags_ids
    Tagging.where(subject_id: id, tag_id: remove_ids).find_each(&:destroy!)
  end
end
