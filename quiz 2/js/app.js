$(document).ready(function(){  
    //1. Identify IP Address
    $.getJSON("https://api.ipify.org/?format=json", function(result){
        if (typeof(Storage) !== "undefined") {
            // Store IP Address locally
            localStorage.setItem("ipAddress", result["ip"]);        
        } else {
            alert("Sorry, your browser does not support Web Storage...");
        }    
    });
    //2. Identify Zip Code
    $.getJSON("http://ip-api.com/json/" + localStorage.getItem("ipAddress"), function(result){                        
        if (typeof(Storage) !== "undefined") {
            // Store Zip Code locally
            localStorage.setItem("zipCode", parseInt(result["zip"]));            
        } else {
            alert("Sorry, your browser does not support Web Storage...");
        }
    });    
    //3. Identify Localized Weather Information
    $.getJSON("https://api.openweathermap.org/data/2.5/weather?zip="  + localStorage.getItem("zipCode") 
                + "&appid=994a6946eec2406e889b7fe9b0ec9728&units=metric", function(result){      
        //render City Name          
        $(".city").html(result.name);
        //render Current Date 
        $(".date").html(getDate());
        //render weather type Clear | Rain
        $(".main").html(result.weather[0].main);
        //render images
        $(".icon").html("<img src= 'images/" + result.weather[0].icon + ".png'/>");
        //render temperature
        $(".temp").html(Math.round(result.main.temp));
        //render humidity
        $(".humidity").html("Humidity: " + result.main.humidity + "%");
        //render wind
        $(".wind").html(result.wind.speed + " km/h");
    });

    //Check on click event for the link C
    $("#linkC").click(function(){
        //If a link does not contain class active, allow on click event
        if($(this).hasClass('active')){
            //Convert C to F
            $(".temp").html(convertCtoF(parseInt($(".temp").text())));
            //Convert m per hour to km per hour
            $(".wind").html(convertMPHtoKMPH(parseFloat($(".wind").text().split(" ")[0])) + " km/h");
            $(this).removeClass("active");
             $("#linkF").addClass("active");
        }
    });

    //Check on click event for the link F
    $("#linkF").click(function(){
        //If a link does not contain class active, allow on click event
        if($(this).hasClass('active')){
            //Convert F to C
            $(".temp").html(convertFtoC(parseInt($(".temp").text())));
            //Convert km per hour to m per hour
            $(".wind").html(convertKMPHtoMPH(parseFloat($(".wind").text().split(" ")[0])) + " mph");
            $(this).removeClass("active");
            $("#linkC").addClass("active");
        }
    });
});

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

/**
 * convert F to C
 * @param F value 
 */
function convertFtoC(value){
    return Math.round((value * 9/5) + 32);
}

/**
 * convert C to F
 * @param C value 
 */
function convertCtoF(value){
    return Math.round((value - 32) * (5/9));
}

/**
 * convert MPH to KMPH
 * @param MPH value 
 */
function convertMPHtoKMPH(value) {
    return Math.round(((3.6 * value) / 2.237) * 100)/ 100;
}

/**
 * convert KMPH to MPH
 * @param KMPH value 
 */
function convertKMPHtoMPH(value) {
    return Math.round(((2.237 * value) / 3.6) * 100) / 100;
}