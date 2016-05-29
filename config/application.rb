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

    config.time_zone = 'Pacific Time (US & Canada)'

    config.assets.precompile << 'cms/bundle.js'
    config.assets.precompile << 'client/bundle.js'

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
