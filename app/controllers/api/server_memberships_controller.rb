class Api::ServerMembershipsController < ApplicationController
  before_action :require_logged_in

  def create
    @server = Server.find_by(name: params[:name])
    if @server
      @server_membership = ServerMembership.new(server_id: @server.id, user_id: current_user.id)
      if @server_membership.save
        render 'api/servers/show'
      else
        # render json: @server_membership.errors.full_messages, status: 422
        render json: ["You are already in this server"], status: 422
      end
    else
      render json: ["Server not found"], status: 404
    end
  end

  private

  def server_membership_params
    params.require(:server_membership).permit(:server_id, :user_id)
  end
end
