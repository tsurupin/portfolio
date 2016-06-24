class Client::ApplicationController < ApplicationController

  layout 'client/layouts/application'

  def rails_cache(cache_name, &block)
    Rails.cache.fetch(cache_name, expires_in: Settings.rails_cache_expiration_hours.hours) do
      block.call
    end
  end

end
