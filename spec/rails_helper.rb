ENV['RAILS_ENV'] ||= 'test'
require 'spec_helper'
require File.expand_path('../../config/environment', __FILE__)
abort("The Rails environment is running in production mode!") if Rails.env.production?
require 'rspec/rails'
require 'shoulda/matchers'
require 'capybara/rspec'
require 'capybara/rails'
require 'selenium-webdriver'
#require 'capybara/poltergeist'
require 'factory_girl_rails'
require 'vcr'


Capybara.asset_host = 'http://localhost:4000'

Capybara.register_driver :selenium do |app|
  Capybara::Selenium::Driver.new(app, :browser => :chrome)
end

# Capybara.register_driver :poltergeist do |app|
#   Capybara::Poltergeist::Driver.new(
#       app,
#       debug: true,
#       phantomjs_logger: true,
#       window_size: [1100, 6000],
#       phantomjs_option: ['--load-images=no', '--ignore-ssl-errors=yes']
#   )
# end
# Capybara.javascript_driver = :poltergeist
Dir[Rails.root.join('spec/supports/**/*.rb')].each { |f| require f }
ActiveRecord::Migration.maintain_test_schema!

RSpec.configure do |config|
  config.include FactoryGirl::Syntax::Methods
  config.include SignInMacros

  config.include Capybara::DSL
  config.fixture_path = "#{::Rails.root}/spec/fixtures"


  config.use_transactional_fixtures = false

  config.infer_spec_type_from_file_location!


  config.before(:suite) do |example|
    DatabaseCleaner.strategy = :truncation
    DatabaseCleaner.clean_with :truncation
    FactoryGirl.reload
  end

  config.around(:each) do |example|
    DatabaseCleaner.cleaning do
      example.run
    end
  end

  config.after(:each) do
    DatabaseCleaner.clean
    Timecop.return
  end

end

Shoulda::Matchers.configure do |config|
  config.integrate do |with|
    with.test_framework :rspec
    with.library :rails
  end
end

VCR.configure do |c|
  c.cassette_library_dir = 'spec/fixtures/vcrs'
  c.hook_into :webmock
  c.allow_http_connections_when_no_cassette = true
  c.filter_sensitive_data('<TWITTER_CONSUMER_KEY>') { Settings.twitter_consumer_key }
  c.filter_sensitive_data('<TWITTER_CONSUMER_SECRET>') { Settings.twitter_consumer_secret }
  c.filter_sensitive_data('<TWITTER_ACCESS_TOKEN>') { Settings.twitter_access_token }
  c.filter_sensitive_data('<TWITTER_ACCESS_TOKEN_SECRET>') { Settings.twitter_access_token_secret }
  uri_without_timestamp = VCR.request_matchers.uri_without_param(:timestamp)
  c.default_cassette_options = { record: :new_episodes, match_requests_on: [:method, uri_without_timestamp], allow_playback_repeats: true }
end
