class HomeController < ApplicationController
  def index
    @jfile = File.read(Rails.public_path+"info.json")	
  	@jdata = JSON.parse(@jfile)
	  @bagcount = @jdata["bagcount"]
	  
	  @newsitem = @jdata["newsfeed"].sort_by { |hash| [Date.today - hash['date'].to_date] }[0]
	  
  end
end
