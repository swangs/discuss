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
    @server = Server.new(server_params)
    if @server.save
      render 'api/servers/show'
    else
      render json: @server.errors.full_messages
    end
  end

  def destroy
    @server = Server.find_by(id: params[:id])
    @server.delete
  end

  private

  def server_params
    params.require(:server).permit()
  end
end
