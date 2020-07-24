$(document).ready(function(){          
    getNewYorkTime();
    $(".nav li").each(function(index, value){
        $(this).click(function()  {  
            if($(".nav li").hasClass("active")) {
                $(".nav li").removeClass("active");
                $(".contentNYT").hide();                               
                $(".contentWTT").hide();
                $(".contentGMS").hide(); 
            }                      
            $(this).addClass("active");    
            if ($(this).attr("id").localeCompare("WTT") == 0){
                $(".contentWTT").show();                
            } else {
                $(".contentNYT").show();                
            }
        });
    });

    $("#submitButton").click(function()  {   
        if($("#searchInput").val().length == 0) {
            $(".my-body").html("There is no forecast record");
        } else {                 
            $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" 
                    + $("#searchInput").val()
                    + "&appid=994a6946eec2406e889b7fe9b0ec9728&units=metric", function(result){   
                var content = "";                                   
                content = content.concat("<div class='city'>" + result.name + "</div>");
                content = content.concat("<div class='date'>" + getDate() + "</div>");
                content = content.concat("<div class='forecast'>" + result.weather[0].main + "</div>");
                content = content.concat("<div class='clearfix'>");
                content = content.concat("<div class='other'>");
                content = content.concat("<div class='humidity'>Humidity: " + result.main.humidity  + "%</div>");
                content = content.concat("<div class='windy'>Wind: <span class='wind'>" + result.wind.speed + " km/h</span></div>");
                content = content.concat("</div>");                    
                content = content.concat("<div class='icon'><img src= '/images/" + result.weather[0].icon + ".png'/></div>");
                content = content.concat("<div class='switch'> ");
                content = content.concat("<span>&#8451;</span>");
                content = content.concat("</div>");
                content = content.concat("<div class='temp'>" + Math.round(result.main.temp) + "</div>");
                content = content.concat("</div>");                
                $(".my-body").html(content);
            });
        }
    });
});

function getNewYorkTime() {
    $.getJSON("https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=MkoBV2BF4L5yxGb1W3DFxYVUMFUxhBZJ&limit=10", function(result){              
        var results = result["results"];        
        var items_length = results.length;
        if(items_length == 0) {
            $(".contentNYT").text("There is no article.");
        } else {
            var html = "";  
            for(var i = 0; i < items_length; i++) {
                html = html.concat("<div class='clearfix'>");   // Begin clearfix  div
                html = html.concat("<div class='left'>");       // Begin left div
                if(results[i].multimedia == null) {
                    html = html.concat("<a href='"+ results[i].url 
                                    + "'><img src='images/notfound.png' width='200' height='130'/></a>");
                }else{
                    html = html.concat("<a href='"+ results[i].url 
                                    + "'><img src='" + results[i].multimedia[1].url 
                                    + "' width='200' height='130'/></a>");
                }                
                html = html.concat("</div>");                   // End left div
                html = html.concat("<div class='right'>");      // Begin right div
                // Title
                html = html.concat("<div class='form-group'>"); // Begin form-group div
                html = html.concat("<label class='control-label col-sm-2'>Title: </label>");    
                html = html.concat("<div class='col-sm-10'>");  // Begin col-sm-10 div
                html = html.concat("<p class='form-control-static'><a href='"+ results[i].url 
                                    + "'>" + results[i].title + "</a></p>");
                html = html.concat("</div>");                   // End col-sm-10 div
                html = html.concat("</div>");                   // End form-group div
                // Abstract
                html = html.concat("<div class='form-group'>"); // Begin form-group div
                html = html.concat("<label class='control-label col-sm-2'>Abstract: </label>");    
                html = html.concat("<div class='col-sm-10'>");  // Begin col-sm-10 div
                if(results[i].abstract.length == 0) {
                    html = html.concat("<p class='form-control-static'>None</p>");
                } else {
                    html = html.concat("<p class='form-control-static'>" + results[i].abstract + "</p>");
                }
                html = html.concat("</div>");                   // End col-sm-10 div
                html = html.concat("</div>");
                // Published
                html = html.concat("<div class='form-group'>"); // Begin form-group div
                html = html.concat("<label class='control-label col-sm-2'>Published: </label>");       
                html = html.concat("<div class='col-sm-10'>");  // Begin col-sm-10 div
                if(results[i].first_published_date.length == 0) {
                    html = html.concat("<p class='form-control-static'>None</p>");
                } else {
                    html = html.concat("<p class='form-control-static'>" + convertPublishedDate(results[i].first_published_date) + "</p>");
                }
                html = html.concat("</div>");                   // End col-sm-10 div
                html = html.concat("</div>");                   // End form-group div
                // Type
                html = html.concat("<div class='form-group'>"); // Begin form-group div
                html = html.concat("<label class='control-label col-sm-2'>Type: </label>");
                html = html.concat("<div class='col-sm-10'>");  // Begin col-sm-10 div
                if(results[i].item_type.length == 0) {
                    html = html.concat("<p class='form-control-static'>None</p>");
                } else {
                    html = html.concat("<p class='form-control-static'>" + results[i].item_type + "</p>");
                }
                html = html.concat("</div>");                   // End col-sm-10 div
                html = html.concat("</div>");                   // End form-group div
                // Source
                html = html.concat("<div class='form-group'>"); // Begin form-group div
                html = html.concat("<label class='control-label col-sm-2'>Section: </label>");
                html = html.concat("<div class='col-sm-10'>");  // Begin col-sm-10 div
                if(results[i].subsection.length == 0) {
                    if(results[i].section.length == 0) {
                        html = html.concat("<p class='form-control-static'>None</p>");
                    } else {
                        html = html.concat("<p class='form-control-static'>" + results[i].section + "</p>");
                    }
                } else {
                    html = html.concat("<p class='form-control-static'>" + results[i].section + " &raquo; " + results[i].subsection + "</p>");
                }
                html = html.concat("</div>");                   // End col-sm-10 div
                html = html.concat("</div>");                   // End form-group div
                html = html.concat("</div>");                   // End right div                
                html = html.concat("</div>");                   // End clearfix  div
            }

            $(".contentNYT").html(html);
        }
    });
}


function convertPublishedDate(str) {
    var res = str.split("T");
    var date = res[0].split("-");
    var hour = res[1].split("-");
    return  hour[0] + "  " + date[1] + "-" + date[2] + "-" + date[0];
}

/**
 * Function get current date time
 */
function getDate() {
    var date = new Date();
    var day = "";
    switch(date.getDay()) {
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thurday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;
        default:
            day = "Is not a day";
    }
    var hours = 0;
    var ampm = " AM";
    if (date.getHours() == 24) {
        hours = 0;
        ampm = " AM";
    } else {
        if (date.getHours() > 12 && date.getHours() < 24) {
            hours = date.getHours() - 12;
            ampm = " PM";
        } else {
            hours = date.getHours();
            ampm = " AM";
        }
    }
    var minutes = date.getMinutes();
    return day + " " +  hours + ":" + minutes + ampm;
}