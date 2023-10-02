"use strict";
(function (window) {
    const $$$ = function () {
        /*------------------------------------------------
        Global
        -
        @ Navbar Scroll Effect
        @ Fading Effect
        @ Tawk.to API for Conversation
        @ Top to Bottom Implementation
        @ Facebook SDK
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
                ...document.querySelectorAll(
                    ".__home-page .__about-section .__switch section"
                ),
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
        }

        /////
        const $main = function () {
            $scroll();
            $fade();
            $t2b();
            $fbsdk();
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
