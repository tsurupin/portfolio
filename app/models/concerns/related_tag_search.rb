module RelatedTagSearch
  extend ActiveSupport::Concern
  included do
    def self.related_by_tag(tag_id = nil)
      return all unless tag_id
      joins(:taggings).merge(Tagging.by_tag(tag_id))
    end
  end
end
