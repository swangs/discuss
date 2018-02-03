class Api::ChannelsController < ApplicationController
  before_action :require_logged_in

  def index
    @channels = Server.find_by(id: params[:server_id]).channels
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
      @channel = Channel.new(server_params)
      @channel.server_id = params[:server_id]
      if @channel.save
        render 'api/channel/show'
      else
        render json: @channel.errors.full_messages, status: 422
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
