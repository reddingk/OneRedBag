class C1M2S3Controller < ApplicationController
  def index
	@jfile = File.read(Rails.public_path+"info.json")	
	@jdata = JSON.parse(@jfile)
	@bagcount = @jdata["bagcount"]
	
	@newsfeed =  []
	@jdata["newsfeed"].each do |newsitem|
		@newsfeed << newsitem
	end
	
	@meetup = []
	@jdata["meetup"].each do |meets|
		@meetup << meets
	end
	
	@publictest = Dir.glob("public/Photos/*")
	@p_test = []
	@publictest.each do |tests|
		@p_test << tests
	end
	
	##Key
	@keyfile = File.read("#{Rails.root}/private/lock.json")	
	@keydata = JSON.parse(@keyfile)
	
	render layout: "c1m2s3"
  end

	##PageEdit Tool
  def edit
	@jfile = File.read(Rails.public_path+"info.json")	
	@jdata = JSON.parse(@jfile)
	@bagcount = @jdata["bagcount"]

	render layout: "c1m2s3"
  end
  
  def item_list
	@pagename = params[:page]
	@jfile = File.read(Rails.public_path+"info.json")	
	@jdata = JSON.parse(@jfile)
	
	@items = []
	
	@sortedpage = @jdata[@pagename].sort_by { |hash| [Date.today - hash['date'].to_date] }
	@sortedpage.each do |pageitem|
		@items << pageitem
	end
	render layout: "c1m2s3"
  end

  def _bag_edit

  end
  
  ##Data Updates
  def dataupdate
  	@jfile = File.read(Rails.public_path+"info.json")	
	@jdata = JSON.parse(@jfile)
		
	@type = params[:type]
		
	if @type == "bag"
		@value = params[:value]
		
		@jdata["bagcount"] = @value
			
	elsif @type == "newsfeed"
		@newsid = params[:id]
		@newsdate = params[:date]
		@newstitle = params[:title]
		@newscontent = params[:content]
			
		@jdata["newsfeed"][@newsid.to_f]["date"] = @newsdate
		@jdata["newsfeed"][@newsid.to_f]["title"] = @newstitle
		@jdata["newsfeed"][@newsid.to_f]["content"] = @newscontent
			
	elsif @type == "meetup"
		@meetid = params[:id]
		@meetdate = params[:date]
		@meettitle = params[:title]
		@meetlocation = params[:location]
		@meettime = params[:time]
		
		@jdata["meetup"][@meetid.to_f]["date"] = @meetdate
		@jdata["meetup"][@meetid.to_f]["title"] = @meettitle
		@jdata["meetup"][@meetid.to_f]["location"] = @meetlocation
		@jdata["meetup"][@meetid.to_f]["time"] = @meettime
			
	end
		
	##Save to File
	File.open(Rails.public_path+"info.json","w") do |f|
	  f.write(@jdata.to_json)
	end
			
	##render :text => "GOT IT [" + @type + "]"
	##render :text => "GOT IT [" + @type + "]=[nid]= " + @newsid + " [ntitle]= " + @newstitle + " [ndate]= " + @newsdate + " [ncontent]= " + @newscontent 
	##render :text => "GOT IT [" + @type + "]=[id]= " + @meetid + " [title]= " + @meettitle + " [date]= " + @meetdate + " [location]= " + @meetlocation + " [time]= " + @meettime
	render :text => "COMPLETE"
  end
  
  ##Add new item
  def datanew
  	@jfile = File.read(Rails.public_path+"info.json")	
	@jdata = JSON.parse(@jfile)
  	
  	@type = params[:type]
  		
  	if @type == "newsfeed"
		@newsdate = params[:date]
		@newstitle = params[:title]
		@newscontent = params[:content]
		
		@newdata = { :date => @newsdate, :title => @newstitle, :content => @newscontent }
		@jdata["newsfeed"] << @newdata
			
	elsif @type == "meetup"
		@meetdate = params[:date]
		@meettitle = params[:title]
		@meetlocation = params[:location]
		@meettime = params[:time]
		
		@newdata = {:date => @meetdate, :title => @meettitle, :location => @meetlocation, :time => @meettime}	
		@jdata["meetup"] << @newdata
		
	end
	
	File.open(Rails.public_path+"info.json","w") do |f|
	  f.write(@jdata.to_json)
	end
	
	render :text => "ADDED CORRECTLY"
  end
  ##Check Password
  def lockcheck
  	##Key
	@keyfile = File.read("#{Rails.root}/private/lock.json")	
	@keydata = JSON.parse(@keyfile)
	@door = ""
	
	@keypwd = params[:pwd]
	@keyusr = params[:user]
	
	if @keypwd == @keydata["password"]
		@door = "open"
	else
		@door = "close"
	end
	
	render :text => @door
  end
  
end
