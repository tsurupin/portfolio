class Home
  POST_NUMBER = 3.freeze
  include ActiveModel::Serialization
  attr_reader :project, :posts

  def initialize
    @author   = Author.first
    @posts    = Post::Search.latest.limit(POST_NUMBER).to_a
    @project  = Project::Search.latest.last
  end

  def introduction
    @author.introduction
  end

  private

  alias_method  :latest_posts, :posts
  alias_method  :latest_project, :project

end