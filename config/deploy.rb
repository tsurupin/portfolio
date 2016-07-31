# config valid only for current version of Capistrano
lock '3.6.0'

set :application, 'portfolio'
set :repo_url, 'git@github.com:tsurupin/portfolio.git'

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
rails_env = ENV['RACK_ENV'] || 'development'

app_path = '/var/www/portfolio'
set :deploy_to, app_path

set :ssh_options, {
  keys: %w(~/.ssh/portfolio.pem),
  forward_agent: true,
  auth_methods: %w(publickey)
}
# set :branch, rails_env

# Default value for :scm is :git
# set :scm, :git

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
# set :log_level, :debug

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# set :linked_files, fetch(:linked_files, []).push('config/database.yml', 'config/secrets.yml')

# Default value for linked_dirs is []
# set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle')
# set :unicorn_rack_env, rails_env
# set :unicorn_config_path, "#{app_path}/current/config/unicorn.rb"
# set :unicorn_pid, "#{app_path}/current/tmp/pids/unicorn.pid"

# Default value for default_env is {}
set :default_env, path: '/usr/local/rbenv/shims:/usr/local/rbenv/bin:$PATH'
# set :linked_files, %w{config/database.yml config/secret.yml}
set :linked_dirs, %w(bin vendor/bundle log tmp/pids tmp/cache tmp/sockets public/system)
