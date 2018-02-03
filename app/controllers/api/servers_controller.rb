class Api::ServersController < ApplicationController
  before_action :require_logged_in

  def index
    @servers = current_user.servers.where(direct_message: false)
    render 'api/servers/index'
  end

  def show
    @server = Server.find_by(id: params[:id])
    if @server
      render 'api/servers/show'
    else
      render json: ["Server not Found"], status: 404
    end
  end

  def create
    if signed_in?
      @server = Server.new(server_params)
      @server.owner_id = current_user.id
      if @server.save
        ServerMembership.create(server_id: @server.id, user_id: current_user.id)
        Channel.create(name: "#general", server_id: @server.id)
        render 'api/servers/show'
      else
        render json: @server.errors.full_messages, status: 422
      end
    else
      render json: ["Must be logged in"], status: 404
    end
  end

  def destroy
    @server = Server.where(direct_message: false).find_by(id: params[:id])
    if @server
      if current_user && @server.owner_id === current_user.id
        @server.delete
        render json: {}
      else
        render json: ["You cannot delete this server"], status: 404
      end
    else
      render json: ["Server does not Exist"], status: 404
    end
  end

  private

  def server_params
    params.require(:server).permit(:name)
  end
end
