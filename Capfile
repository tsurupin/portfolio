require 'capistrano/setup'

require 'capistrano/deploy'
require 'new_relic/recipes'

require 'capistrano/rbenv'
set :rbenv_type, :user
set :rbenv_ruby, '2.3.0'

require 'capistrano/rails'
require 'capistrano/bundler'
require 'capistrano/rails/assets'
require 'capistrano/rails/migrations'
require 'capistrano3/unicorn'


Dir.glob('lib/capistrano/tasks/*.rake').each { |r| import r }