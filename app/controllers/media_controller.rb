class MediaController < ApplicationController
  def index
    
    @albumlocation = Dir.glob("public/images/*")
  	@albums = []
  	
  	@albumlocation.each do |album|
  		@albums << album
  	end
  	
  end
  
  def album
    @albumlocation = params[:location]
    
    @photolocation = Dir.glob( @albumlocation + "/*")
    	@photos = []
          	
    	@photolocation.each do |photo|
      @photos << photo
    end
  
  end
  
end
