class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
      Server.create(
        name: "#{@user.username}Server",
        owner_id: @user.id,
        direct_message: true
      )
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
