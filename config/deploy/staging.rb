rails_env = 'staging'
app_path = '/var/www/portfolio'

role :app, [Settings.aws_ec2_ip]
role :web, [Settings.aws_ec2_ip]
role :db, [Settings.aws_ec2_ip]
role :batch, [Settings.aws_ec2_ip]


set :branch, 'staging'
set :rails_env, 'staging'
set :migration_role, 'db'
set :whenever_environment, :staging

set :deploy_to, app_path

server Settings.aws_ec2_ip, user: 'ec2-user', roles: %w(web app db batch)

set :unicorn_rack_env, rails_env
set :unicorn_config_path, "#{app_path}/current/config/unicorn.rb"
set :unicorn_pid, "#{app_path}/current/tmp/pids/unicorn.pid"



namespace :deploy do
  task :restart do
    invoke 'unicorn:restart'
  end

  after 'deploy:updated', 'newrelic:notice_deployment'
  after 'deploy:publishing', 'deploy:restart'

  namespace :database do
    desc 'Create Database'
    task :create do
      on roles(:db) do
        run "cd #{current_path} && bundle exec rake db:create RAILS_ENV=staging"
      end
    end

    desc 'Create Database'
    task :drop do
      on roles(:db) do
        run "cd #{current_path} && bundle exec rake db:drop RAILS_ENV=staging"
      end
    end

    desc 'Load seed data'
    task :seed  do
      on roles(:all) do
        within current_path do
          run 'bundle exec rake db:seed RAILS_ENV=staging'
        end
      end
    end
  end
end
