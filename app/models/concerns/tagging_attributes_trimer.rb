module TaggingAttributesTrimer
  extend ActiveSupport::Concern

  TAGGINGS_ATTRIBUTES = 'taggings_attributes'.freeze

  def trim_tagging_attributes!(params)
    return unless params
    params.each do |item|
      tag = Tag.find_or_create_by!(name: item['text'])
      item['tag_id'] = tag.id
      item.delete('text')
    end
  end
end
