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
	
	
	render layout: "c1m2s3"
  end

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
	@jdata[@pagename].each do |pageitem|
		@items << pageitem
	end
	render layout: "c1m2s3"
  end

  def _bag_edit

  end
end
