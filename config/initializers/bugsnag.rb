if Rails.env.production? || Rails.env.staging?
  Bugsnag.configure do |config|
    config.api_key = Settings.bugsnag_api_key
  end
end
