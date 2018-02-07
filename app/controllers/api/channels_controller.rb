class Api::ChannelsController < ApplicationController
  before_action :require_logged_in

  def index
    @channels = Server.find_by(id: params[:server_id]).channels
    @direct_message_channels = Server.find_by(id: params[:server_id]).direct_message_channels
    render 'api/channels/index'
  end

  def show
    @channel = Channel.find_by(id: params[:id])
    if @channel
      render 'api/channels/show'
    else
      render json: ["Channel not Found"], status: 404
    end
  end

  def create
    if signed_in?
      server = Server.find(params[:server_id])
      if server.direct_message
        @channel = Channel.new
        user = User.find(params[:channel][:userId])
        current_memberships = DirectMessageMembership.where(server_id: params[:server_id])
        already_exists = false
        current_memberships.each do |membership|
          conflict = DirectMessageMembership.where(channel_id: membership.channel_id)
            .where(server_id: user.servers.where(direct_message: true).first.id)
          if !conflict.empty?
            already_exists = conflict.first.channel_id
            break
          end
        end
        if already_exists
          render json: [already_exists, "Direct Message Already Exists"], status: 402
        else
          @channel.name = "#{current_user.username}#{user.username}"
          @channel.save
          DirectMessageMembership.create(
            server_id: current_user.servers.where(direct_message: true).first.id,
            channel_id: @channel.id)
          DirectMessageMembership.create(
            server_id: user.servers.where(direct_message: true).first.id,
            channel_id: @channel.id)
            render 'api/channels/show'
        end
      else
        @channel = Channel.new(channel_params)
        @channel.server_id = params[:server_id]
        if @channel.save
          render 'api/channels/show'
        else
          render json: @channel.errors.full_messages, status: 422
        end
      end
    else
      render json: ["Must be logged in"], status: 404
    end
  end

  def destroy
    @channel = Channel.find_by(id: params[:id])
    if @channel
      if current_user && @channel.server.owner_id === current_user.id
        @channel.delete
        render json: {}
      else
        render json: ["You cannot delete this channel"], status: 404
      end
    else
      render json: ["Channel does not Exist"], status: 404
    end
  end

  private

  def channel_params
    params.require(:channel).permit(:name)
  end
end
