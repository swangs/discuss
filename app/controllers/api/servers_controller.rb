class Api::ServersController < ApplicationController

  def create

  end

  private

  def server_params
    params.require(:server).permit()
  end
end
