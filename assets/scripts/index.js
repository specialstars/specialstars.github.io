"use strict";
(function (window) {
 const $$$ = function () {
  /*------------------------------------------------
  Global
  -
  @ Navbar Scroll Effect
  @ Fading Effect
  @ Tawk.to API for Conversation
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
    ...document.querySelectorAll(".__home-page .__feature-section .main"),
    ...document.querySelectorAll(".__home-page .__feature-section .main p"),
    document.querySelector(".__home-page .__about-section .__images"),
    ...document.querySelectorAll(".__home-page .__about-section .__switch section"),
    ...document.querySelectorAll(".__home-page .__details-section .__card"),
    document.querySelector(".__home-page .__media-section .__media"),
    document.querySelector(".__home-page .__faq-section"),
   ];

   function fadeIn(elem) {
    if (elem == null) return;
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

  // Start of Tawk.to Script
  if (
   document.querySelector(".__contact-page") ||
   document.querySelector(".__about-page")
  ) {
   var Tawk_API = Tawk_API || {},
    Tawk_LoadStart = new Date();
   (function () {
    var s1 = document.createElement("script"),
     s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = "https://embed.tawk.to/65069f500f2b18434fd8f3e9/1hagtslgt";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    s0.parentNode.insertBefore(s1, s0);
   })();
  }
  // End of Tawk.to Script

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
