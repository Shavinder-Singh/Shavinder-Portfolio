

window.onload = function () {
  setTimeout(() => {
    document.querySelector(".loader").style.display = "none";
    document.querySelector(".body_container").classList.add("loaded");
  }, 1); // 1.5 seconds

};