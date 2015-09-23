class HomeController < ApplicationController
  def index
    @jfile = File.read(Rails.public_path+"info.json")	
  	@jdata = JSON.parse(@jfile)
	  @bagcount = @jdata["bagcount"]
	  
	  @newsitem = @jdata["newsfeed"][0]
  end
end
