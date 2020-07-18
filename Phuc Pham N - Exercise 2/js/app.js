$(document).ready(function(){
    $("#thumbBox img").each(function(index){
        $(this).click(function(){
            var src = $(this).attr("src");
            var path = ("images/medium/").concat(src.split("/")[2]);            
            $("#imgManipulated img").attr("src", path);
            var alt = $(this).attr("alt");                                   
            var title = $(this).attr("title");  
            html = "<em>" + alt +"</em><br/>" + title;
            $("figcaption").html(html);            
        });
    });
    
    $("#sliderOpacity, #sliderSaturation, #sliderBrightness, #sliderHue, #sliderGray, #sliderBlur").on('input', function() {        
        var valOpacity = $("#sliderOpacity").val();
        var valSaturation = $("#sliderSaturation").val();
        var valBrightness = $("#sliderBrightness").val();
        var valHue = $("#sliderHue").val();
        var valGray = $("#sliderGray").val();
        var valBlur = $("#sliderBlur").val();
        $("#imgManipulated img").css("filter","opacity(" + valOpacity + "%) "  
                                        + "saturate(" + valSaturation + "%) " 
                                        + "brightness(" + valBrightness + "%) " 
                                        + "hue-rotate(" + valHue + "deg) " 
                                        + "grayscale(" + valGray + "%) " 
                                        + "blur(" + valBlur + "px)" );        
        $("#imgManipulated img").css("-webkit-filter","opacity(" + valOpacity + "%) "  
                                        + "saturate(" + valSaturation + "%) " 
                                        + "brightness(" + valBrightness + "%) " 
                                        + "hue-rotate(" + valHue + "deg) " 
                                        + "grayscale(" + valGray + "%) " 
                                        + "blur(" + valBlur + "px)" ); 
        $("#numOpacity").html(valOpacity); 
        $("#numSaturation").html(valSaturation);
        $("#numBrightness").html(valBrightness);
        $("#numHue").html(valHue);
        $("#numGray").html(valGray);
        $("#numBlur").html(valBlur);
    });
    
    $("#resetFilters").click(function(){                 
        $("#sliderOpacity").val(100); 
        $("#sliderSaturation").val(100);
        $("#sliderBrightness").val(100);
        $("#sliderHue").val(0);
        $("#sliderGray").val(0);
        $("#sliderBlur").val(0);

        $("#numOpacity").html(100); 
        $("#numSaturation").html(100);
        $("#numBrightness").html(100);
        $("#numHue").html(0);
        $("#numGray").html(0);
        $("#numBlur").html(0);

        $("#imgManipulated img").css("filter", "opacity(100%) saturate(100%) brightness(100%) hue-rotate(0deg) grayscale(0%) blur(0px)");
        $("#imgManipulated img").css("-webkit-filter", "opacity(100%) saturate(100%) brightness(100%) hue-rotate(0deg) grayscale(0%) blur(0px)");
    });
    
});