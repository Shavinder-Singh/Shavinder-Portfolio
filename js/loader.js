

window.onload = function () {
  setTimeout(() => {
    document.querySelector(".loader").style.display = "none";
    document.querySelector(".body_container").classList.add("loaded");
  }, 4200); // 1.5 seconds

};