function finddates(addval) { 
    var cal_date = $(".month").text();
    var months = [ "NA" ,"january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december" ];
    var month_num = ( months.indexOf(cal_date.split(' ')[0].toLowerCase()) > 9 ? "" + months.indexOf(cal_date.split(' ')[0].toLowerCase()) : "0" +months.indexOf(cal_date.split(' ')[0].toLowerCase()) );
    var eventhtml = "";
    
    //console.log("{add}=" + addval + " {cal}=" +  cal_date.split(' ')[0].toLowerCase() + " {index}= " + months.indexOf(cal_date.split(' ')[0].toLowerCase()) +" {month}=" + month_num); 
    $.ajax(
    {
        type: "GET",
        url:'/helpus/getdates',
        dataType: "JSON",
        data: $.param({ month: month_num }),
            success:function(data) {
                
                $.each( data, function( key, val ) {
                    eventhtml = eventhtml + "<tr class='dayevents' id='dayevent-"+val.date.split("-")[2] +"'><td>" + val.date.split("-")[1]+"/"+val.date.split("-")[2]
                                          + "</td><td class='event-info'><div>"+ val.title + "- <span>"+ ( parseInt(val.time.split(":")[0], 10) < 13 ? val.time + " AM" : parseInt(val.time.split(":")[0],10)-12+":"+val.time.split(":")[1] + " PM")+"</span></div><div>"+val.location+"</div></td></tr>";
                });
                $('#event-content').html(eventhtml);
        },
        error: function(err) {
            console.log(err);
        }
    });
};
 $(document).on('click', '.clndr-previous-button', function() {
    finddates(-1); 
});
    
$(document).on('click', '.clndr-next-button', function() { 
    finddates(1);
});
$(document).on('click', '.event .day-contents', function() { 
    
    $(".dayevents").removeClass("selected");
    if(parseInt($(this).text()) < 10) {
        $('#dayevent-0'+ $(this).text()).addClass("selected");
    }
    else {
        $('#dayevent-'+ $(this).text()).addClass("selected");
    }
});

$('.event-list').ready(function() {
        finddates(0);
});