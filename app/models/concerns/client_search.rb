module ClientSearch
  extend ActiveSupport::Concern
  included do

    def self.client_search(options = {})
      eager_load(:tags)
        .accepted
        .related_by_tag(options[:tag])
        .latest
    end

    def self.related_by_tag(tag_id = nil)
      return all unless tag_id
      joins(:taggings).merge(Tagging.by_tag(tag_id))
    end

    def self.accepted
      where(accepted: true)
    end

    def self.latest
      order(updated_at: :desc)
    end
  end

end