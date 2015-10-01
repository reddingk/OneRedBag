class NewsController < ApplicationController
  def index
      @jfile = File.read(Rails.public_path+"info.json")	
	    @jdata = JSON.parse(@jfile)
	    
	    @newsfeed =  []
	    @sortednews = @jdata["newsfeed"].sort_by { |hash| [Date.today - hash['date'].to_date] }
	    @sortednews.each do |newsitem|
		    @newsfeed << newsitem
	    end
	    
	    @albumlocation = Dir.glob("public/images/*")
	    @picturelocation = Dir.glob( @albumlocation[0] +"/*")
	    
  end
end
