require 'carrierwave/processing/mime_types'

class AuthorImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick
  include CarrierWave::MimeTypes
  process :set_content_type


  if Rails.env.production?
    storage :fog
  else
    storage :file
  end

  def store_dir
    "uploads/project/#{mounted_as}/#{model.id}/"
  end

  def extension_white_list
    %w(jpg gif png jpeg)
  end

  def filename
    "#{secure_token}.#{file.extension}" if original_filename.present?
  end

  protected

  def secure_token
    var = :"@#{mounted_as}_secure_token"
    model.instance_variable_get(var) || model.instance_variable_set(var, SecureRandom.uuid)
  end
end
