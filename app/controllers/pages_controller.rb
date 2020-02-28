class PagesController < ApplicationController
  include HTTParty

  def home
    @platform_id = params[:platform_id]
  end
end
