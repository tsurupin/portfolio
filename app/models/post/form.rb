# == Schema Information
#
# Table name: posts
#
#  id           :integer          not null, primary key
#  title        :string(255)      not null
#  description  :text(65535)
#  accepted     :boolean          default("0"), not null
#  published_at :datetime
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Post::Form < ActiveType::Record[Post]
  include DataURIToImageConverter
  ITEMS_ATTRIBUTES = 'items_attributes'.freeze
  POST_TAGS_ATTRIBUTES = 'post_taggings_attributes'.freeze

  validates :description, presence: true, if: proc { |post| post.accepted }

  accepts_nested_attributes_for :items, reject_if: ->(attributes) { attributes['target_type'].blank? }
  accepts_nested_attributes_for :post_taggings, reject_if: ->(attributes) { attributes['post_tag_id'].blank? }

  def save_all(params)
    ActiveRecord::Base.transaction do
      delete_unnecessary_items!(params[ITEMS_ATTRIBUTES]) if self.id
      delete_unnecessary_post_tags!(params[POST_TAGS_ATTRIBUTES]) if self.id

      if params[POST_TAGS_ATTRIBUTES]
        params[POST_TAGS_ATTRIBUTES].each do |item|
          post_tag = PostTag.find_or_create_by!(name: item['text'])
          item['post_tag_id'] = post_tag.id
          item.delete('text')
        end
      end

      params[ITEMS_ATTRIBUTES].each.with_index(1) do |item, index|
        target = item['target_type'].constantize.find_or_initialize_by(id: item['target_id'])

        case target.class.name
          when 'ItemHeading', 'ItemSubHeading'
            target.title = item['title']
          when 'ItemQuote'
            target.description = item['description']
            target.source_url = item['source_url']
          when 'ItemText'
            target.description = item['description']
          when 'ItemImage'
            target.image = convert_data_uri_to_upload(item['image']) unless target.image.try(:url) == item['image']
          when 'ItemLink'
            target.source_title = item['source_title']
            target.source_url = item['source_url']
          when 'ItemTwitter'
            target.source_url         = item['source_url']
            target.description        = item['description']
            target.author_name        = item['author_name']
            target.author_image_url   = item['author_image_url']
            target.author_screen_name = item['author_screen_name']
          else
        end

        target.save!
        item_id = item['id']
        item.clear.merge!(
          id: item_id,
          sort_rank: index,
          target_id: target.id,
          target_type: target.class.name
        )
      end

      p params
      update!(params)
      true
    end

  rescue => e
    errors[:base] << e.message
    p e.message, e.backtrace_locations
    logger.error "error: #{e.message}, location: #{e.backtrace_locations}"
    false
  end

  def delete_unnecessary_items!(params)
    removed_ids = items.map(&:id) - params.map { |key, _| key['id'] }
    Item.where(post_id: id, id: removed_ids).find_each(&:destroy!)
  end

  def delete_unnecessary_post_tags!(params)
    post_tags_ids = PostTag.where(name: params.map(&:values)).pluck(:id)
    remove_ids = post_tags.map(&:id) - post_tags_ids
    PostTagging.where(post_id: id, post_tag_id: remove_ids).find_each(&:destroy!)
  end
end
