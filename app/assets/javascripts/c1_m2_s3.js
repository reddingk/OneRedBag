/*CMS JS*/

function cmssave(identifier, item_num) {
    console.log("CMS-Save");
    //Bag Count Updater
    if(identifier == "bag-count"){
        var bagvalue = $('#'+identifier).val();
        console.log("[b]= " + bagvalue );
        
        //Save Value Ajax
        $.ajax(
            {
                type: "POST",
                url:'dataupdate',
                dataType: "text",
                data: $.param({type: "bag", value: bagvalue }),
                success:function(status) {
                    console.log("YES: " + status);
                },
                error: function(err) {
                    console.log(err);
                }
            });
        $('#bag-count-close').click();
    }
    else if(identifier == "newsfeed"){
        var newsid = item_num;
        var newstitle = $('#'+identifier+"-item-title-" + item_num).val();
        var newsdate = $('#'+identifier+"-item-date-" + item_num).val();
        var newscontent = $('#'+identifier+"-item-content-" + item_num).val();
        
        //TEST-Data
        //console.log("[nid]= " + newsid +" [ntitle]= " + newstitle + " [ndate]= "+ newsdate + " [ncontent]= " + newscontent);
        
        //Save Value Ajax
        $.ajax(
            {
                type: "POST",
                url:'dataupdate',
                dataType: "text",
                data: $.param({type: "newsfeed", id: newsid, date: newsdate, title: newstitle, content: newscontent }),
                success:function(status) {
                    console.log("YES: " + status);
                },
                error: function(err) {
                    console.log(err);
                }
            });
        $('#newsfeed-close-' + item_num).click();
    }
     else if(identifier == "meetup"){
        var meetid = item_num;
        var meettitle = $('#'+identifier+"-item-title-" + item_num).val();
        var meetdate = $('#'+identifier+"-item-date-" + item_num).val();
        var meetlocation = $('#'+identifier+"-item-location-" + item_num).val();
        var meettime = $('#'+identifier+"-item-time-" + item_num).val();
        
        //TEST-Data
        console.log("[mid]= " + meetid +" [mtitle]= " + meettitle + " [mdate]= "+ meetdate + " [mlocation]= " + meetlocation + " [mtime]= " + meettime);
        
        //Save Value Ajax
        $.ajax(
            {
                type: "POST",
                url:'dataupdate',
                dataType: "text",
                data: $.param({type: "meetup", id: meetid, date: meetdate, title: meettitle, location: meetlocation, time: meettime }),
                success:function(status) {
                    console.log("YES: " + status);
                },
                error: function(err) {
                    console.log(err);
                }
            });
        $('#meetup-close-'+ item_num).click();
    }
    
    //Refresh Page
    location.reload();
}