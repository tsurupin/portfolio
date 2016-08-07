rails_env = 'staging'
current_path = '/var/www/portfolio/current'

role :app, 'ec2-user@52.52.23.154'
role :web, 'ec2-user@52.52.23.154'
role :db, 'ec2-user@52.52.23.154'
role :batch, 'ec2-user@52.52.23.154'


set :branch, 'staging'
set :rails_env, 'staging'
set :log_level, :debug

server '52.52.23.154', user: 'ec2-user', roles: %w{web app db batch}

set :unicorn_rack_env, rails_env
set :unicorn_config_path, "#{current_path}/config/unicorn.rb"
set :unicorn_pid, "#{current_path}/tmp/pids/unicorn.pid"



namespace :deploy do
  task :restart do
    invoke 'unicorn:restart'
  end

  after 'deploy:updated', 'newrelic:notice_deployment'
  after 'deploy:publishing', 'deploy:restart'
end

namespace :database do
  desc 'Create Database'
  task :create do
    on roles(:db) do
      run "cd #{current_path} && RAILS_ENV=#{rails_env} bundle exec rake db:create"
    end
  end

  desc 'Create Database'
  task :drop do
    on roles(:db) do
      run "cd #{current_path} && RAILS_ENV=#{rails_env} bundle exec rake db:drop"
    end
  end

  desc 'Load seed data'
  task :seed  do
    on roles(:all) do
      within current_path do
        run "RAILS_ENV=#{rails_env} bundle exec rake db:seed"
      end
    end
  end
end
