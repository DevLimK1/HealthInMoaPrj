$(document).ready(function(){
    
    var API_KEY="AIzaSyCGHtbofr5C_j5YRooXlsqljlb6WYp1Lqc";

    var video= '';

    $("#form").submit(function(event){
        event.preventDefault();

        var search=$("#search").val();

        videoSearch(API_KEY,search,10);
    });

    function videoSearch(key,search,maxResults){
    $("#videos").empty();

        $.get("https://www.googleapis.com/youtube/v3/search?key="+key+"&type=video&part=snippet&maxResults="+maxResults+"&q="+search,function(data){
            console.log(data)

            data.items.forEach(item=>{
                video=`
                <iframe id="player" type="text/html" width="420" height="315"
  src="http://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
                `
                $("#videos").append(video);
            })
        })
    }

});