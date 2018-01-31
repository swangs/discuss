class Api::ServersController < ApplicationController

  def index
    @servers = Server.where(direct_message: false)
    render 'api/servers/index'
  end

  def show
    @server = Server.find_by(id: params[:id])
    render 'api/servers/show'
  end

  def create
    if signed_in?
      @server = Server.new(server_params)
      @server.owner_id = current_user.id
      if @server.save
        render 'api/servers/show'
      else
        render json: @server.errors.full_messages
      end
    else
      render json: ["Must be logged in"], status: 404
    end
  end

  def destroy
    @server = Server.find_by(id: params[:id])
    if current_user && @server.owner_id === current_user.id
      if @server
        @server.delete
        render json: {}
      else
        render json: ["Server does not Exist"]
      end
    else
      render json: ["Cannot delete this server"], status: 404
    end
  end

  private

  def server_params
    params.require(:server).permit(:name)
  end
end
