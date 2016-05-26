class Home
  attr_reader :description, :image, :latest_projects, :latest_posts

  def initialize
    @author = Author.first
    @site = [] # Site.first
  end

  def description
    @author.description
  end

  def image
    @site.image_url
  end

  def latest_projects
    Project.latest
  end

  def latest_posts
    Post.latest
  end
end