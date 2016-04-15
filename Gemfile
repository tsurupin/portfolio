source 'https://rubygems.org'
ruby '2.3.0'

gem 'rails', '>= 5.0.0.beta3', '< 5.1'

gem 'sqlite3'

gem 'puma'

gem 'haml-rails'
gem 'sass-rails', '~> 5.0'

gem 'uglifier', '>= 1.3.0'

gem 'coffee-rails', '~> 4.1.0'
gem 'jquery-rails'
gem 'turbolinks', '~> 5.x'
gem 'jbuilder', '~> 2.0'
gem 'redis', '~> 3.0'

# For View


# For Image upload
gem 'carrierwave'                 # 画像アップローダ
gem 'mini_magick'                 # CarrierWaveでリサイズなどができるようになる
gem 'fog'

# For Model and AR

gem 'active_type'
gem 'factory_girl_rails'
gem 'enum_help'

# For Config
gem 'config'

# Not Supported in Rails 5 yet
# gem 'squeel'
# gem 'draper'

group :development do
  # For Deploy
  gem 'capistrano-rails'
  gem 'capistrano'
  gem 'capistrano-rails', require: false
  gem 'capistrano-bundler', require: false
  gem 'capistrano-rbenv', require: false
  gem 'capistrano3-unicorn'

  gem 'annotate'
  gem 'rails-db-resetup'

  gem 'rubocop', require: false
  gem 'scss_lint', require: false
  gem 'erb2haml'

  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 3.0'
  gem 'listen', '~> 3.0.5'
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'pry'
  gem 'awesome_print'
  gem 'hirb'
  gem 'hirb-unicode'
  gem 'letter_opener'
  gem 'rack-mini-profiler', require: false
  gem 'bullet'
  gem 'quiet_assets'

  gem 'byebug'

  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

group :test do
  gem 'rspec'
  gem 'rspec-rails'
  gem 'launchy'
  gem 'database_cleaner'
  gem 'capybara'
  gem 'timecop'
  gem 'poltergeist'
  gem "selenium-webdriver"
  gem 'simplecov', require: false
  gem 'shoulda-matchers'
  gem 'webmock'
  gem 'vcr'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
