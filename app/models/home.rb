class Home
  POST_NUMBER = 3
  include ActiveModel::Serialization
  attr_reader :project, :posts

  def initialize
    @author   = Author.first
    @posts    = Post::Search.latest.limit(POST_NUMBER)
    @project  = Project::Search.latest.first
  end

  def introduction
    @author.introduction
  end

  alias latest_posts posts
  alias latest_project project
end
