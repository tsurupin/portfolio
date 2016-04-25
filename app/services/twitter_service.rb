class TwitterService
  attr_reader :response_params

  def initialize(url)
    @url = url
  end

  def receive
    @response_params ||= {
      author_image_url: author_image_url,
      author_name: client.user.name,
      author_screen_name: client.user.screen_name,
      description: client.full_text
    }
    true

  rescue
    @response_params ||= { error_message: 'Cannot retrieve info from this url' }
    false
  end

  private

  def client
    @client ||= $twitter.status(tweet_id)
  end

  def tweet_id
    @url.match(%r{https://twitter.com/.*/status/(\w*)})[1].to_i
  end

  def author_image_url
    "http://pbs.twimg.com#{client.user.profile_image_url.path}"
  end
end
