/**
 * Copyright 2023 & All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";
let isLoaded = false;

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
 getDatabase,
 ref,
 onValue,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

let $firebase_init = initializeApp;
let $firebase_database = getDatabase;
let $firebase_database_ref = ref;
let $firebase_database_then = onValue;

var __mediaSection, __media, __mediaLoading;
__mediaSection = document.querySelector(".__media-section .__media");
__media = document.querySelectorAll(
 ".__media-section .__media #__mediaResults"
)[0];
__mediaLoading = document.querySelectorAll(
 ".__media-section .__media #__mediaLoading"
)[0];

const $firebase_config = {
 apiKey: "AIzaSyBm3d0-_5Ll3uYxaNeGiPizR9WTUYVmnTk",
 authDomain: "specialstars-dev.firebaseapp.com",
 projectId: "specialstars-dev",
 storageBucket: "specialstars-dev.appspot.com",
 messagingSenderId: "930978839693",
 appId: "1:930978839693:web:280b4a16f438ee86b636c4",
 databaseURL:
  "https://specialstars-dev-default-rtdb.asia-southeast1.firebasedatabase.app/",
};
$firebase_init = $firebase_init($firebase_config);
$firebase_database = $firebase_database($firebase_init);

/**
 * Creates a post element.
 */
function createPostElement(i, data) {
 let postElement = document.createElement("div");
 postElement.classList.add("col-lg-6");
 postElement.id = data.id || "";

 var title = data.title || "Untitled";
 var body = data.body || "No Description is provided.";
 var picture =
  data.type != "event"
   ? data.picture || "assets/images/banner.jpg"
   : data.picture || "assets/images/banner-event.png";
 var tags = data.tags || "0";
 var date = new Date(data.date).toDateString();

 body = body
  .replaceAll("\\n", "<br/>")
  .replace(/@([a-z0-9_]+)/gi, '<span class="text-danger">$&</span>')
  .replace(
   /#([a-z0-9_]+)/gi,
   '<a class="text-primary" href="https://www.google.com/search?q=%23$1" target="_blank">#$1</a>'
  );
 postElement.innerHTML = `
        <div class="row" ${
         data.type != "event"
          ? `onclick="document.getElementById('modalMediaShowMoreTitle').innerHTML = this.parentElement.querySelector('h5').innerHTML; document.getElementById('modalMediaShowMoreBody').innerHTML = this.parentElement.querySelector('p').innerHTML; document.getElementById('modalMediaShowMoreImage').src = this.querySelector('.__header > img').src; document.getElementById('modalMediaShowMoreAuthor').innerHTML = this.parentElement.parentElement.querySelector('span.date').innerHTML; document.getElementById('modalMediaShowMoreTags').innerHTML = this.parentElement.querySelector('span.tags').innerHTML;"`
          : `onclick="document.getElementById('modalMediaShowMoreTitle').innerHTML = this.parentElement.querySelector('h5').innerHTML; document.getElementById('modalMediaShowMoreBody').innerHTML = '<b>Place:</b> ' + '${data.place}' + '<br/><b>Time: </b>'+ '${data.time}' +'<hr/><br/>' + this.parentElement.querySelector('p').innerHTML; document.getElementById('modalMediaShowMoreImage').src = this.querySelector('.__header > img').src;"`
        } data-bs-target="#modalMediaShowMore" data-bs-toggle="modal" title="Click here to see the full post">
            <div class="__header col-md-6 ${data.type == "event" && "d-none"}">
                <img src=${picture} alt="Cover Photo" />
            </div>
            <div class="__body col-md-6 ${data.type == "event" && `col-md-12`}">
                <h5>${data.type == "event" ? `📣` : ""} ${
  title + (data.type == "event" ? " (" + data.tid + ")" : "")
 }</h5>
                <p>${body}</p>
                <div class="mt-auto">
                    <div class="d-flex">
                        <span class="date me-2 ${
                         data.type == "event" && "bg-primary text-white"
                        }">${
  data.type != "event"
   ? date
   : new Date(data.start).toDateString() +
     " - " +
     new Date(data.end).toDateString()
 }</span>
                        <span class="tags">${
                         data.type != "event" ? tags : "EVENT"
                        }</span>
                    </div>
                </div>
            </div>
        </div>
    `;
 if (document.querySelector(".__home-page")) {
  if (data.type == "post") {
   __media.appendChild(postElement);
  }
 } else if (document.querySelector(".__updates-page")) {
  __media.appendChild(postElement);
 }
}

/**
 * Starts listening for new posts and populates posts lists.
 */
function startDatabaseQueries() {
 let recentPostsRef = $firebase_database_ref($firebase_database, "posts");

 var fetchPosts = async function (postsRef) {
  await $firebase_database_then(postsRef, function (data) {
   let posts = data.val();
   let allEvents = [];
   if (posts.length >= 1) {
    if (__media) __media.innerHTML = "";
    for (var post in posts) {
     let p = posts[post];
     if (p.type == "event") {
      allEvents.push({
       title: "(" + p.tid + ") " + p.title,
       start: p.start,
       end: p.end,
       time: p.time,
       place: p.place,
       body: p.body
        .replaceAll("\\n", "<br/>")
        .replace(/@([a-z0-9_]+)/gi, '<span class="text-danger">$&</span>')
        .replace(
         /#([a-z0-9_]+)/gi,
         '<a class="text-primary" href="https://www.google.com/search?q=%23$1" target="_blank">#$1</a>'
        ),
       status: p.status,
       display: p.status == "Upcoming" ? "" : "list-item",
      });
     }
    }
    if (document.querySelector(".__home-page")) {
     posts = posts
      .filter((post) => {
       if (post.type == "post") return true;
       return false;
      })
      .slice(0, 4);
    }
    // Iterate through posts.
    for (var post in posts) {
     let p = posts[post];
     if (__mediaLoading) __mediaLoading.style.display = "none";
     createPostElement(post, p);
    }
   }

   /** Calender Starts */
   var calendarEl = document.getElementById("calendar");
   var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    events: [...allEvents],
    eventClick: function (info) {
     const myModal = new bootstrap.Modal("#modalOfEvent", {
      keyboard: false,
     });
     const modalBody = document.querySelector("#modalOfEvent .modal-body");
     const modalTitle = document.querySelector("#modalOfEvent .modal-title");
     const duration = info.event.end
      ? (new Date(info.event.end).getTime() -
         new Date(info.event.start).getTime()) /
        (1000 * 3600 * 24)
      : 1;
     modalTitle.innerHTML = info.event.title;
     modalBody.innerHTML = `
                    <p><b>Status:</b> ${
                     info.event.extendedProps.status == "Completed"
                      ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                  </svg> Completed`
                      : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-history" viewBox="0 0 16 16">
                  <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"/>
                  <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"/>
                  <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
                </svg> ${info.event.extendedProps.status}`
                    }</p>
                    <p class="mb-0"><b>Place:</b> ${
                     info.event.extendedProps.place
                    }</p>
                    <p class="mb-0"><b>Start:</b> ${new Date(
                     info.event.start
                    ).toDateString()}</p>
                    ${
                     info.event.end
                      ? "<p class='pb-0'><b>End:</b> " +
                        new Date(info.event.end).toDateString() +
                        "</p>"
                      : ""
                    }
                    <p class="mb-0"><b>Time:</b> ${
                     info.event.extendedProps.time
                    }</p>
                    <p><b>Duration:</b> ${duration} day${
      duration > 1 ? "s" : ""
     }</p>
                    <p><b>Message:</b><br/> <pre style="white-space: pre-wrap">${
                     info.event.extendedProps.body
                    }</pre></p>
                `;
     myModal.show();
    },
   });
   calendar.render();
   window.onscroll = function () {
    calendar.render();
   };
   /** Calender Ends */
   isLoaded = true;
  });
 };

 // Fetching and displaying all posts of each sections.
 fetchPosts(recentPostsRef);
}

/**
 * Load everything & intersecting __media
 */
window.addEventListener("load", () => {
 if (__mediaSection) {
  // Start listening for posts.
  startDatabaseQueries();

  // Loading Effect on Scroll
  if (window.IntersectionObserver) {
   const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
     if (entry.isIntersecting) {
      __media.classList.add("d-none");
      __mediaLoading.style.display = "flex";
      setTimeout(
       () => {
        __media.classList.remove("d-none");
        __mediaLoading.style.display = "none";
       },
       isLoaded == true ? 0 : 1000
      );
     }
    });
   });
   observer.observe(__mediaSection);
  }
 }
});
