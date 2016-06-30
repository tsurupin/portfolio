if Rails.env.production? || Rails.env.staging?
  CarrierWave.configure do |config|
    config.fog_credentials = {
        provider:                   'AWS',
        aws_access_key_id:         ENV["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key:     ENV["AWS_SECRET_ACCESS_KEY"],
        region:                    ENV["AWS_REGION"]
    }
    config.fog_directory =  ENV["AWS_S3_BUCKET_NAME"]
    config.permissions = 0666
    config.directory_permissions = 0777
    config.storage = :fog
  end
end

CarrierWave::SanitizedFile.sanitize_regexp = /[^[:word:]\.\-\+]/
