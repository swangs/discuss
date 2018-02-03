class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
      server = Server.create(
        name: "#{@user.username}Server",
        owner_id: @user.id,
        direct_message: true
      )
      ServerMembership.create(server_id: server.id, user_id: @user.id)
      ServerMembership.create(server_id: 11, user_id: @user.id)
      ServerMembership.create(server_id: 12, user_id: @user.id)
      ServerMembership.create(server_id: 13, user_id: @user.id)
      Channel.create(name: "Welcome to Discuss", server_id: server.id)
      sign_in(@user)
      render 'api/users/show'
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
