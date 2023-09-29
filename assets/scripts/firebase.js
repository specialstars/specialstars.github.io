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
 update,
 increment,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

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
 * Saves a new post to the Firebase DB.
 */
function writeNewPost(username, picture, title, body) {
 // A post entry.
 var postData = {
  author: username,
  picture: picture,
  title: title,
  body: body,
  tags: [...new Set(body.match(/#[a-z]+/gi))],
  date: Date.now(),
 };

 // Get a key for a new Post.
 var newPostKey = $firebase_database
  .ref($firebase_database)
  .child("posts")
  .push().key;

 // Write the new post's data simultaneously in the posts list and the user's post list.
 var updates = {};
 updates["/posts/" + newPostKey] = postData;

 return $firebase_database.ref().update(updates);
}

/**
 * Creates a post element.
 */
function createPostElement(i, data) {
 let postElement = document.createElement("div");
 postElement.classList.add("col-lg-6");
 postElement.id = data.id || "";

 var title = data.title || "Untitled";
 var body = data.body || "No Description is provided.";
 var author = data.author || "A Member";
 var picture = data.picture || "assets/images/banner.jpg";
 var tags = data.tags || "0";
 var date = new Date(data.date).toDateString();

 // Put <br/> when there is a 1. 2. 3. lists
 body = body.replace(
  /\d\.\s/g,
  "<br/><br/><br/><mark class='text-success'>$&</mark> "
 );

 // Put <br/> grammatically
 body = body
  .replace(/([.?!])\s*(?=[A-Z])/g, "$1|")
  .split("|")
  .join("<br/><br/>");

 // set class text-danger to all words that starts with @
 body = body.replace(/@([a-z0-9_]+)/gi, '<span class="text-danger">$&</span>');

 // replace all hashtags with links
 body = body.replace(
  /#([a-z0-9_]+)/gi,
  '<a class="text-primary" href="https://www.google.com/search?q=%23$1" target="_blank">#$1</a>'
 );
 postElement.innerHTML = `
        <div class="row" onclick="document.getElementById('modalMediaShowMoreTitle').innerHTML = this.parentElement.parentElement.querySelector('h5').innerHTML; document.getElementById('modalMediaShowMoreBody').innerHTML = this.parentElement.parentElement.querySelector('p').innerHTML; document.getElementById('modalMediaShowMoreImage').src = this.querySelector('.__header > img').src; document.getElementById('modalMediaShowMoreAuthor').innerHTML = this.parentElement.parentElement.querySelector('span.date').innerHTML; document.getElementById('modalMediaShowMoreTags').innerHTML = this.parentElement.parentElement.querySelector('span.tags').innerHTML;" title="Click here to see the full post" data-bs-toggle="modal" data-bs-target="#modalMediaShowMore">
            <div class="__header col-md-6">
                <img src=${picture} alt="&nbsp;">
            </div>
            <div class="__body col-md-6">
                <h5>${title}</h5>
                <p>${body}</p>
                <div class="mt-auto">
                    <div class="d-flex">
                        <span class="date me-2">${date}</span>
                        <span class="tags">${tags}</span>
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
   var posts = data.val();
   if (posts.length >= 1) {
    if (__media) __media.innerHTML = "";
    // limit to top 1 post only
    if (document.querySelector(".__home-page"))
     posts = Object.values(posts).slice(0, 2);
    // Iterate through posts.
    for (var post in posts) {
     if (__mediaLoading) __mediaLoading.style.display = "none";
     createPostElement(post, posts[post]);
    }
   }
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
