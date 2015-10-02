class HelpusController < ApplicationController
  def index
    @jfile = File.read(Rails.public_path+"info.json")	
	  @jdata = JSON.parse(@jfile)
	  
	  @full_clndr = Clndr.new(:full)
    @full_clndr.start_with_month = Time.now
    
	  @meetup = []
	  @jdata["meetup"].each do |meets|
		  @full_clndr.add_event(meets["date"], meets["title"], description:'We will be meeting at:' + meets["location"] + 'at ' + meets["time"] )
		  @meetup << meets
	  end
  end
  
  def getdates
    @month = params[:month]
    
    @jfile = File.read(Rails.public_path+"info.json")	
	  @jdata = JSON.parse(@jfile)
	  
	  @meetup = []
	  @jdata["meetup"].each do |meets|
	   if meets["date"].split('-')[1] == @month
		    @meetup << meets
		  end
	  end
	  #render :text => "HERE"
	  render :json => @meetup
  end
  
end
