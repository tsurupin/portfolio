worker_processes 2

preload_app true

timeout 900

app_path = '/var/www/portfolio'

listen "#{app_path}/shared/tmp/sockets/unicorn.sock"
pid "#{app_path}/current/tmp/pids/unicorn.pid"

before_exec do |_server|
  ENV['BUNDLE_GEMFILE'] = "#{app_path}/current/Gemfile"
end


ROOT = File.dirname(File.dirname(__FILE__))
stderr_path "#{ROOT}/log/unicorn-stdout.log"
stdout_path "#{ROOT}/log/unicorn-stderr.log"

before_fork do |server, _worker|
  defined?(ActiveRecord::Base) and ActiveRecord::Base.connection.disconnect!

  old_pid = "#{server.config[:pid]}.oldbin"
  unless old_pid == server.pid
    begin
      Process.kill('QUIT', File.read(old_pid).to_i)
    rescue Errno::ENOENT, Errno::ESRCH
    end
  end
end

after_fork do |_server, _worker|
  defined?(ActiveRecord::Base) and ActiveRecord::Base.establish_connection
end