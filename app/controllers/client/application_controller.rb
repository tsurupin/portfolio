class Client::ApplicationController < ApplicationController
  layout 'client/layouts/application'

  def rails_cache(cache_name, &_block)
    Rails.cache.fetch(cache_name, expires_in: Settings.rails_cache_expiration_hours.hours) do
      yield
    end
  end
end
