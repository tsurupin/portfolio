class Home
  POST_NUMBER = 5.freeze
  include ActiveModel::Serialization

  def initialize
    @author = Author.first
  end

  def introduction
    @author.introduction
  end

  def latest_posts
    Post::Search.latest.limit(POST_NUMBER)
  end

  def latest_project
    Project::Search.latest.last
  end

end