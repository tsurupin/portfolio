rails_env = 'staging'
current_path = '/var/www/portfolio/current'

role :app, [Settings.aws_staging_ec2_ip]
role :web, [Settings.aws_staging_ec2_ip]
role :db, [Settings.aws_staging_ec2_ip]
role :batch, [Settings.aws_staging_ec2_ip]


set :branch, 'staging'
set :rails_env, 'staging'
# set :migration_role, 'db'
# set :whenever_environment, :staging


server Settings.aws_staging_ec2_ip, user: 'ec2-user', roles: %w(web app db batch)

set :unicorn_rack_env, rails_env
set :unicorn_config_path, "#{current_path}/config/unicorn.rb"
set :unicorn_pid, "#{current_path}tmp/pids/unicorn.pid"



namespace :deploy do
  task :restart do
    invoke 'unicorn:restart'
  end

  after 'deploy:updated', 'newrelic:notice_deployment'
  after 'deploy:publishing', 'deploy:restart'
  after :deploy, 'assets:precompile'

  task :precompile, roles: :web do
    run "cd #{current_path} && RAILS_ENV=#{rails_env} bundle exec rake assets:precompile"
  end

  task :cleanup, roles: :web do
    run "cd #{current_path} && RAILS_ENV=#{rails_env} bundle exec rake assets:clean"
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
end
