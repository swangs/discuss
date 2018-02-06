class Api::ServerMembershipsController < ApplicationController
  before_action :require_logged_in

  def create
    @server = Server.where(direct_message: false).find_by(name: params[:name])
    if @server
      @server_membership = ServerMembership.new(server_id: @server.id, user_id: current_user.id)
      if @server_membership.save
        render 'api/servers/show'
      else
        render json: ["You are already in this server"], status: 422
      end
    else
      render json: ["Server not found"], status: 404
    end
  end

  def destroy
    @server_membership = ServerMembership.where(user_id: params[:user_id]).find_by(server_id: params[:server_id])
    if @server_membership
      @server_membership.destroy
      @servers = current_user.servers.where(direct_message: false)
      render 'api/servers/index'
    else
      render json: ["Server not found"], status: 404
    end
  end

  private

  def server_membership_params
    params.require(:server_membership).permit(:server_id, :user_id)
  end
end
