module ClientSearch
  extend ActiveSupport::Concern
  included do
    scope :client_search, lambda { |options = {}|
      accepted
        .related_by_tag(options[:tag])
        .latest
    }

    scope :related_by_tag, ->(tag_id = nil) {
      joins(:taggings).merge(Tagging.by_tag(tag_id)) if tag_id
    }

    scope :accepted, -> { where(accepted: true) }
    scope :latest, -> { order(updated_at: :desc) }
  end

end