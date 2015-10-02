function finddates(addval) { 
    var cal_date = $(".month").text();
    var months = [ "january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december" ];
    var month_num = months.indexOf(cal_date.split(' ')[0].toLowerCase()) + 1 + addval;
    var eventhtml = "";
    
    $.ajax(
    {
        type: "GET",
        url:'/helpus/getdates',
        dataType: "JSON",
        data: $.param({ month: month_num }),
            success:function(data) {
                $.each( data, function( key, val ) {
                    console.log("mon: "+ month_num +" date- " + val.date);
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


$( document ).ready(function() {
    finddates(0);
    
    $('.event .day-contents').click(function() {
        $(".dayevents").removeClass("selected");
        $('#dayevent-'+ $(this).text()).addClass("selected");
    });
    
     $('.clndr-previous-button').click(function() {  finddates(-1); });
     $('.clndr-next-button').click(function() { finddates(1); });
});