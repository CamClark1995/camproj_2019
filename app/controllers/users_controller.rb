class UsersController < ApplicationController
  skip_before_action :authenticate_user, only: %i[new create]

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to(login_path, notice: "User #{@user.username} Successfully Created! You may now sign in.")
    else
      render :new
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
