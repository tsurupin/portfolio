module DataURIToImageConverter
  extend ActiveSupport::Concern

  def convert_data_uri_to_upload(obj_hash)
    return obj_hash unless obj_hash.try(:match, /^data:(.*?);(.*?),(.*)$/)
    image_data = split_base64(obj_hash)
    image_data_string = image_data[:data]
    image_data_binary = Base64.decode64(image_data_string)

    temp_image_file = Tempfile.new('data_uri-upload')
    temp_image_file.binmode
    temp_image_file << image_data_binary
    temp_image_file.rewind

    image_params = {
      filename: "data-uri-image.#{image_data[:extension]}",
      type: image_data[:type],
      tempfile: temp_image_file
    }

    ActionDispatch::Http::UploadedFile.new(image_params)
  end

  def split_base64(uri_str)
    return nil unless uri_str =~ /^data:(.*?);(.*?),(.*)$/
    uri             = {}
    uri[:type]      = Regexp.last_match(1)
    uri[:encoder]   = Regexp.last_match(2)
    uri[:data]      = Regexp.last_match(3)
    uri[:extension] = Regexp.last_match(1).split('/')[1]
    uri
  end
end
