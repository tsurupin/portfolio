AssetSync.configure do |config|
  config.fog_provider = 'AWS'
  config.aws_access_key_id = Settings.aws_access_key_id
  config.aws_secret_access_key = Settings.aws_secret_access_key
  config.fog_region = Settings.aws_region
  config.fog_directory = Settings.aws_s3_bucket_name
  config.gzip_compression = true

end
