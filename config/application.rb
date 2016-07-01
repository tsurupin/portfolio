require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Portfolio
  class Application < Rails::Application

    config.active_record.default_timezone = :local
    config.i18n.default_locale = :en
    config.active_record.raise_in_transactional_callbacks = true
    config.to_prepare do
      DeviseController.respond_to :html, :json
    end

    # remove unnecessary middlewares for api
    config.middleware.delete Rack::Sendfile
    config.middleware.delete ActionDispatch::Cookies
    config.middleware.delete ActionDispatch::Session::CookieStore
    config.middleware.delete ActionDispatch::Flash
    config.middleware.delete Rack::MethodOverride

    config.time_zone = 'Pacific Time (US & Canada)'

    config.assets.precompile += %w(*.png *.jpg *.jpeg *.gif)

    config.generators do |g|
      g.stylesheets false
      g.javascript false
      g.helper false
      g.assets false
      g.test_framework :rspec,
                       fixtures: true,
                       view_specs: false,
                       helper_specs: false,
                       routing_specs: false,
                       controller_specs: false,
                       request_specs: false
      g.fixture_replacement :factory_girl, dir: "spec/factories"
    end

  end
end
