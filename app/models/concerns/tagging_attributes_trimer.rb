module TaggingAttributesTrimer
  extend ActiveSupport::Concern

  TAGGINGS_ATTRIBUTES = 'taggings_attributes'.freeze

  def trim_tagging_attributes!(params)
    return unless params
    params.each do |param|
      tag             = Tag.find_or_create_by!(name: param['text'])
      param['tag_id'] = tag.id
      param.delete('text')
    end
  end
end
