ENV['RAILS_ENV'] ||= 'test'
require 'spec_helper'
require File.expand_path('../../config/environment', __FILE__)
abort("The Rails environment is running in production mode!") if Rails.env.production?
require 'rspec/rails'
require 'shoulda/matchers'
require 'capybara/rspec'
require 'capybara/rails'
require 'selenium-webdriver'
require 'factory_girl_rails'
require 'vcr'
require "codeclimate-test-reporter"
CodeClimate::TestReporter.start

Capybara.register_driver :selenium do |app|
  Capybara::Selenium::Driver.new(app, browser: :chrome)
end

Capybara.ignore_hidden_elements = false


Dir[Rails.root.join('spec/supports/**/*.rb')].each { |f| require f }
ActiveRecord::Migration.maintain_test_schema!

RSpec.configure do |config|
  config.include FactoryGirl::Syntax::Methods
  config.include SessionHelpers
  config.include Capybara::DSL
  config.fixture_path = "#{::Rails.root}/spec/fixtures"

  config.use_transactional_fixtures = false

  config.infer_spec_type_from_file_location!


  config.before(:suite) do
    DatabaseCleaner.clean_with(:truncation)
  end

  config.before(:each) do
    DatabaseCleaner.strategy = :transaction
  end

  config.before(:each, js: true) do
    DatabaseCleaner.strategy = :truncation
  end

  config.before(:each) do
    DatabaseCleaner.start
  end

  config.after(:each) do
    DatabaseCleaner.clean
  end

  config.after(:each, js: true) do
    page.execute_script("localStorage.clear()")
  end


end

Shoulda::Matchers.configure do |config|
  config.integrate do |with|
    with.test_framework :rspec
    with.library :rails
  end
end

VCR.configure do |config|
  uri_without_timestamp = VCR.request_matchers.uri_without_param(:timestamp)
  config.cassette_library_dir = 'spec/fixtures/vcrs'
  config.hook_into :webmock
  config.allow_http_connections_when_no_cassette = true
  config.default_cassette_options = {
    record: :new_episodes,
    match_requests_on: [:method, uri_without_timestamp],
    allow_playback_repeats: true
  }
end
