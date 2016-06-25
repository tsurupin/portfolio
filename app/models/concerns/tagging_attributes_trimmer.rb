module TaggingAttributesTrimmer
  extend ActiveSupport::Concern

  def trim_tagging_attributes!(params)
    params&.each do |param|
      tag             = Tag.find_or_create_by!(name: param['text'])
      param['tag_id'] = tag.id
      param.delete('text')
    end
  end
end
