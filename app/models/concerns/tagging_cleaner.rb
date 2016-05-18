module TaggingCleaner
  extend ActiveSupport::Concern

  def delete_unnecessary_tags!(params)
    tags_ids = params.nil? ? [] : Tag.where(name: params.map(&:values)).pluck(:id)
    remove_ids = tags.map(&:id) - tags_ids
    Tagging.where(subject_id: id, tag_id: remove_ids).find_each(&:destroy!)
  end
end
