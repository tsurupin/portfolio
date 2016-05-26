module TaggingAttributesTrimer
  extend ActiveSupport::Concern

  TAGGINGS_ATTRIBUTES = 'taggings_attributes'.freeze

  def trim_tagging_attributes!(params)
    params&.each do |param|
      tag             = Tag.find_or_create_by!(name: param['text'])
      p tag
      param['tag_id'] = tag.id
      param.delete('text')
    end
  end
end
