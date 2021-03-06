window.addEventListener("DOMContentLoaded", function () {
  // *********Sidebar Menu**********

  let bars = document.querySelector(".bars");
  let close = document.querySelector(".close");
  bars.onclick = openSlideMenu;
  close.onclick = closeSlideMenu;

  function openSlideMenu() {
    document.getElementById("menu").style.width = "250px";
    document.getElementById("content").style.marginLeft = "250px";
    document.querySelector(".fa-bars").classList.add("d-none");
  }

  function closeSlideMenu() {
    document.getElementById("menu").style.width = "0px";
    document.getElementById("content").style.marginLeft = "0px";
    document.querySelector(".fa-bars").classList.remove("d-none");
  }

  //  ************ tags section ****************

  // $("#tags-section").on("click", function (e) {
  //   let elem = e.target;
  //   let txt = "";

  //   if ($(elem).text() === "#" || $(elem).prop('tagName')==='I') {
  //     elem = elem.nextElementSibling; 
  //     txt = elem.innerText;
  //   } else if ($(elem).attr("class") === "tag")
  //     txt = $(elem).children()[1].innerText;
  //   else if ($(elem).attr("class") === "text") // get className
  //     txt = $(elem).text();
  //   else return;

  //   console.log(txt);
  //   show(txt);
  // });

  // function show(txt){
      
  // }

  // *************** videos section ***************
  const apikey = "AIzaSyCGHtbofr5C_j5YRooXlsqljlb6WYp1Lqc";
  const channelId = "UCLG1XzhSPuuJ6hqaHhQaFkA";
  const videoChannel = document.querySelector("#video-channel");
  // const videoContainer = document.querySelector("#video-container");
  const thumsContainer = document.querySelector(".thums-container");
  
  const channelEndpoint = `https://www.googleapis.com/youtube/v3/channels?key=${apikey}&id=${channelId}&part=snippet,contentDetails,statistics`;

  $("#tags-section").on("click", function (e) {
    let elem = e.target;
    let txt = "";

    if ($(elem).text() === "#" || $(elem).prop('tagName')==='I') {
      elem = elem.nextElementSibling; 
      txt = elem.innerText;
    } else if ($(elem).attr("class") === "tag")
      txt = $(elem).children()[1].innerText;
    else if ($(elem).attr("class") === "text") // get className
      txt = $(elem).text();
    else return;

    fetch(channelEndpoint)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      // showChannel(data);
      let maxResults = 24;
      const playlistId = data.items[0].contentDetails.relatedPlaylists.uploads;
      requestPlayList(playlistId, maxResults,txt);
    });

    // show(txt);
  });

  // function show(txt){
      
  // }

  fetch(channelEndpoint)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      // showChannel(data);
      let maxResults = 24;
      const playlistId = data.items[0].contentDetails.relatedPlaylists.uploads;
      requestPlayList(playlistId, maxResults);
    });

  // function showChannel(data) {
  //   const imageLink = data.items[0].snippet.thumbnails.medium.url;
  //   const title = data.items[0].snippet.title;
  //   const description = data.items[0].snippet.description;
  //   const videos = data.items[0].statistics.videoCount;
  //   const subscribers = data.items[0].statistics.subscriberCount;
  //   const views = data.items[0].statistics.viewCount;

  //   let output = `
  //         <div class="col-md-6 mb-4 text-center">
  //             <img class="img-fluid" src="${imageLink}">
  //             <br>
  //             <a class="btn btn-danger btn-sm" role="button" href="https://www.youtube.com/channel/${channelId}" target="_blank">Go to My Youtube Channel</a>
  //         </div>
  //         <div class="col-md-6 mb-4>
  //             <ul class="list-group shadow-lg">
  //                 <li class="list-group-item bg-danger text-white"><strong>YOUTUBE CHANNEL:${title}</strong></li>

  //                 <li class="list-group-item "><strong>YOUTUBE DESCRIPTIONS:${description}</strong></li>

  //                 <li class="list-group-item "><strong>YOUTUBE VIDEOS:${numberWithCommas(
  //                   videos
  //                 )}</strong></li>

  //                 <li class="list-group-item "><strong>YOUTUBE SUBSCRIBERS:${numberWithCommas(
  //                   subscribers
  //                 )}</strong></li>

  //                 <li class="list-group-item "><strong>YOUTUBE VIEWS:${numberWithCommas(
  //                   views
  //                 )}</strong></li>
  //             </ul>
  //         </div>
  //     `;
  //   videoChannel.innerHTML = output;
  // }

  // function numberWithCommas(x) {
  //   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // }

  function requestPlayList(playlistId, maxResults,txt) {
    const playlistURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${apikey}&playlistId=${playlistId}&part=snippet&maxResults=${maxResults}`;

    fetch(playlistURL)
      .then((res) => res.json())
      .then((data) => loadVideo(data,txt));
  }

  function loadVideo(data,txt) {
    // console.log(data);
    const playListItems = data.items;

    if (playListItems) {
      let output = "";

      playListItems.map((item) => {
        const videoId = item.snippet.resourceId.videoId;
        const thumbnailsUrl = item.snippet.thumbnails.standard.url;
        const channelTitle = item.snippet.channelTitle;
        const title = item.snippet.title;
        const thumbnailsDescription = item.snippet.description;
        // console.log(thumbnailsUrl);
        // console.log(thumbnailsDescription);
        // let txt='팔';
        if(!txt)
          txt='전체';

        if(title.includes(txt)){
          
          output += `
          <div class="thums-box">
          <div class="title text-center">${channelTitle}</div>
          <div class="imgBox">
              <img
                  src="${thumbnailsUrl}">
                  <div class="details">
                  <div class="content">
                      <h2>${title}</h2>
                  </div>
              </div>
          </div>
         
          </div>
              `;
        }else if(txt==='전체'){
          output += `
          <div class="thums-box">
          <div class="title text-center">${channelTitle}</div>
          <div class="imgBox">
              <img
                  src="${thumbnailsUrl}">
                  <div class="details">
                  <div class="content">
                      <h2>${title}</h2>
                  </div>
              </div>
          </div>
         
          </div>
              `;
        }
          

      });
      //   output += `
      //             <div class="col-lg-4 col-md-6 mb-4">
      //             <div class="card card-body p-0 shadow embed-responsive embed-responsive-16by9">
      //             <iframe  height="auto" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      //             </div>
      //             </div>
      //         `;
      // });

      thumsContainer.innerHTML = output;
    } else {
      thumsContainer.innerHTML = "sorry, No videos uploaded!";
    }
  }
});
