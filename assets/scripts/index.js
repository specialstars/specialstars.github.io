"use strict";
(function (window) {
 const $$$ = function () {
  /*------------------------------------------------
        Global
        -
        @ Navbar Scroll Effect
        @ Fading Effect
        @ Top to Bottom Implementation
        @ Facebook SDK
        @ Messenger Chat Plugin
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
    ...document.querySelectorAll(
     ".__home-page .__about-section .__switch section .body"
    ),
    ...document.querySelectorAll(
     ".__home-page .__about-section .__switch .__service"
    ),
    ...document.querySelectorAll(".__home-page .__about-section .__intro p"),
    ...document.querySelectorAll(".__home-page .__details-section .__card"),
    ...document.querySelectorAll(".__home-page .__update-section .row > div"),
    document.querySelector(".__home-page .__media-section .__media"),
    document.querySelector(".__home-page .__faq-section > div"),
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

  const $t2b = function () {
   let btn = document.querySelector(".__t2b");
   if (btn) {
    window.addEventListener("scroll", () => {
     if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
     ) {
      btn.style.display = "block";
     } else {
      btn.style.display = "none";
     }
    });
    btn.addEventListener("click", () => {
     window.scrollTo({ top: 0, behavior: "smooth" });
    });
   }
  };

  /////

  const $fbsdk = function () {
   (function (d, s, id) {
    var js,
     fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src =
     "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0&appId=992880515259603&autoLogAppEvents=1";
    fjs.parentNode.insertBefore(js, fjs);
   })(document, "script", "facebook-jssdk");
  };

  const $msgplugin = function () {
   var chatbox = document.getElementById("fb-customer-chat");
   if(!chatbox) return;
   chatbox.setAttribute("page_id", "106131139212056");
   chatbox.setAttribute("attribution", "biz_inbox");
   window.fbAsyncInit = function () {
    FB.init({
     xfbml: true,
     version: "v18.0",
    });
   };
   (function (d, s, id) {
    var js,
     fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
    fjs.parentNode.insertBefore(js, fjs);
   })(document, "script", "facebook-jssdk");
  };

  /////
  const $main = function () {
   $scroll();
   $fade();
   $t2b();
   $fbsdk();
   $msgplugin();
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
