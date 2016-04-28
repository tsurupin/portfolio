$twitter = Twitter::REST::Client.new do |config|
	config.consumer_key        = Settings.twitter_consumer_key
	config.consumer_secret     = Settings.twitter_consumer_secret
	config.access_token        = Settings.twitter_access_token
	config.access_token_secret = Settings.twitter_access_token_secret
end
