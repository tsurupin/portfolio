AssetSync.configure do |config|
  config.fog_provider = 'AWS'
  config.aws_access_key_id = ENV["AWS_ACCESS_KEY_ID"]
  config.aws_secret_access_key = ENV["AWS_SECRET_ACCESS_KEY"]
  config.fog_region = ENV["AWS_REGION"]
  config.fog_directory = ENV["AWS_S3_BUCKET_NAME"]
  config.gzip_compression = true
end
