window.addEventListener("DOMContentLoaded", function () {
  let bars = document.querySelector(".bars");
  let close=document.querySelector(".close");
  bars.onclick = openSlideMenu;
  close.onclick=closeSlideMenu;

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
});
