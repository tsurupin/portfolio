class Cms::Api::ProjectsController < Cms::ApplicationController
  skip_before_action :authenticate_author_from_token!, only: :index
  protect_from_forgery except: %w(create update destroy)

  def index
    projects = []
    60.times { |i| projects << { title: "hoge", id: i }}
    projects
    #projects = Post.page(params[:page])
    #render json: projects, each_serializer: projectsSerializer
    render json: projects
  end
end