class Home
  ITEM_NUMBER = 5.freeze
  include ActiveModel::Serialization

  def initialize
    @author = Author.first
    @site = Site.first
  end

  def introduction
    @author.introduction
  end

  def image
    @site.image_url
  end

  def latest_posts
    Post::Search.latest.limit(ITEM_NUMBER)
  end

  def latest_project
    Project::Search.latest.last
  end

end