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
                url:'/c1_m2_s3/dataupdate',
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
                url:'/c1_m2_s3/dataupdate',
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
        //console.log("[mid]= " + meetid +" [mtitle]= " + meettitle + " [mdate]= "+ meetdate + " [mlocation]= " + meetlocation + " [mtime]= " + meettime);
        
        //Save Value Ajax
        $.ajax(
            {
                type: "POST",
                url:'/c1_m2_s3/dataupdate',
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

function cmsnew(identifier) {
    console.log("CMS-Add-New");
    
    if(identifier == "newsfeed"){
       
        var newstitle = $('#'+identifier+"-item-title-new").val();
        var newsdate = $('#'+identifier+"-item-date-new").val();
        var newscontent = $('#'+identifier+"-item-content-new").val();
        
        //TEST-Data
        //console.log("[nid]= " + newsid +" [ntitle]= " + newstitle + " [ndate]= "+ newsdate + " [ncontent]= " + newscontent);
        
        //Error Checking
        if((newstitle.length > 0) && (newsdate.length > 0) && (newscontent.length > 0)){ 
            //Save Value Ajax
            $.ajax(
                {
                    type: "POST",
                    url:'/c1_m2_s3/datanew',
                    dataType: "text",
                    data: $.param({type: "newsfeed", date: newsdate, title: newstitle, content: newscontent }),
                    success:function(status) {
                        console.log("YES: " + status);
                    },
                    error: function(err) {
                        console.log(err);
                    }
                });
            $('#newsfeed-close-new').click();
            //Refresh Page
            location.reload();
        }
        else{ 
            var errormessage = "You are missing:" + (newstitle.length <= 0 ? "\nNews Title" : "") + (newsdate.length <= 0 ? "\nNews Date" : "") + (newscontent.length <= 0 ? "\nNews Content" : "");
            alert( errormessage );
        }
    } else if(identifier == "meetup"){
        
        var meettitle = $('#'+identifier+"-item-title-new").val();
        var meetdate = $('#'+identifier+"-item-date-new").val();
        var meetlocation = $('#'+identifier+"-item-location-new" ).val();
        var meettime = $('#'+identifier+"-item-time-new").val();
        
        //TEST-Data
        //console.log("[mtitle]= " + meettitle + " [mdate]= "+ meetdate + " [mlocation]= " + meetlocation + " [mtime]= " + meettime);
        
        //Error Checking
        if((meettitle.length > 0) && (meetdate.length > 0) && (meetlocation.length > 0) && (meettime.length > 0)){ 
            //Save Value Ajax
            $.ajax(
                {
                    type: "POST",
                    url:'/c1_m2_s3/datanew',
                    dataType: "text",
                    data: $.param({type: "meetup", date: meetdate, title: meettitle, location: meetlocation, time: meettime }),
                    success:function(status) {
                        console.log("YES: " + status);
                    },
                    error: function(err) {
                        console.log(err);
                    }
                });
            $('#meetup-close-new').click();
            //Refresh Page
            location.reload();
        }
        else {
            var errormessage ="You are Missing:" + (meettitle.length <= 0 ? "\nMeet Up Title" : "") + (meetdate.length <= 0 ? "\nMeet Up Date" : "") + (meetlocation.length <= 0 ? "\nMeet Up Location" : "") + (meettime.length <= 0 ? "\nMeet Up Time" : "");
            alert(errormessage);
        }
    }
}

function keycheck() { 
    $.ajax(
        {
            type: "POST",
            url:'/c1_m2_s3/lockcheck',
            dataType: "text",
            data: $.param({type: "meetup", pwd: $('#edit-key').val() }),
            success:function(status) {
                if(status == "open"){
                    $(".cms-edit-btn").prop("disabled", false);
                    $(".key-response .wrong-pwd").hide();
                    $(".key-response .right-pwd").show();
                }
                else {
                    $(".cms-edit-btn").prop("disabled",true);
                    $(".key-response .wrong-pwd").show();
                    $(".key-response .right-pwd").hide();
                }
            },
            error: function(err) {
                console.log(err);
            }
    });
}

$( document ).ready(function() {

    //$(".cms-edit-btn").prop("disabled",true);
});