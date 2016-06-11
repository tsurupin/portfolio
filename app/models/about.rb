class About
  include ActiveModel::Serialization

  def initialize
    @author = Author.first
    @site = Site.first
  end

  def description
    @author.description
  end

  def site_description
    @site.description
  end

  def image
    @site.image_url
  end

  def social_accounts
    @author.social_accounts
  end

end