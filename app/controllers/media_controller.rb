class MediaController < ApplicationController
  def index
    
    @albumlocation = Dir.glob("public/images/*")
  	@albums = []
  	
  	@albumlocation.each do |album|
  		@albums << album
  	end
  	
  end
end
