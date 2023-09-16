"use strict";
(function (window) {
 const $$$ = function () {
  /*------------------------------------------------
  Global
  -
  @ Navbar Scroll Effect
  @ Fading Effect
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
  window.addEventListener("scroll", $scroll);
  /////
  const $fade = function () {
   let elementsArray = [
    ...document.querySelectorAll(
     ".__team-page .__list-section .__lists .__list"
    ),
    ...document.querySelectorAll(".__home-page .__b-section .__card"),
    document.querySelector(".__home-page .__c-section"),
    document.querySelector(".__home-page .__faq-section"),
   ];

   function fadeIn(elem) {
    var distInView = elem.getBoundingClientRect().top - window.innerHeight;
    if (distInView) {
     elem.classList.add("__animation");
     if (distInView < 0) {
      elem.classList.add("active");
     } else {
      elem.classList.remove("active");
     }
    }
   }

   window.addEventListener("scroll", function () {
    for (var i = 0; i < elementsArray.length; i++) {
     if (typeof elementsArray[i] == "undefined") continue;
     fadeIn(elementsArray[i]);
    }
   });
  };
  /////
  const $main = function () {
   $scroll();
   $fade();
  };
  window.addEventListener("load", $main);

  /*------------------------------------------------
  Home Page Interaction
  -
  @ 
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
  if (cpY) cpY.innerHTML = new Date().getFullYear();

  /////
 };
 window.addEventListener("load", $$$);
 document.addEventListener("DOMContentLoaded", $$$);
})(window || {});
