"use strict";
(function (window) {
 const $$$ = function () {
  /*------------------------------------------------
  Global
  -
  @ Navbar Scroll Effect
  */
  /////
  const $scroll = function () {
   let header = document.querySelectorAll(".__navbar")[0];
   let headerHeight = header.offsetHeight;
   let scrollTop = window.pageYOffset || window.scrollTop;
   if (scrollTop > headerHeight + 70) {
    header.classList.add("scrolled");
   } else {
    header.classList.remove("scrolled");
   }
  };
  const $main = function () {
   $scroll();
  };
  window.addEventListener("scroll", $scroll);
  window.addEventListener("load", $main);
  /////

  /*------------------------------------------------
  Home Page Interaction
  -
  @ Search box toggle
  @ Animation on Scroll
  ------------------------------------------------
  */

  //////

  /////

  /*------------------------------------------------
  Team Page Interaction
  -
  @ Lazy Image Loading
  ------------------------------------------------
  */

  /////

  if (window.LazyLoad) {
   new LazyLoad({
    elements_selector: ".lazy",
    callback_error: (img) => {
     img.setAttribute("src", "https://placehold.co/600x400?text=Error");
    },
   });
  }

  /////

  /*------------------------------------------------
  Footer Section Interaction
  -
  @ Copyright Year Update
  ------------------------------------------------
  */

  /////

  let cpY = document.getElementById("copyrightYear");
  cpY.innerHTML = new Date().getFullYear();

  /////
 };
 window.addEventListener("load", $$$);
 document.addEventListener("DOMContentLoaded", $$$);
})(window || {});
