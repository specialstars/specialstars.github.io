/**
 * Copyright 2015 Google Inc. All Rights Reserved.
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

var __media = document.querySelectorAll(
 ".__c-section .__media #__mediaResults"
)[0];
var __mediaLoading = document.querySelectorAll(
 ".__c-section .__media #__mediaLoading"
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
function createPostElement(postId, title, body, author, picture, tags, date) {
 let postElement = document.createElement("div");
 postElement.classList.add("col-md-6");
 postElement.innerHTML = `
        <div class="row">
            <div class="__header col-md-5">
                <img src=${picture} alt="&nbsp;">
            </div>
            <div class="__body col-md-7">
                <h4>${title}</h4>
                <p>${body}</p>
                <div>
                    <div class="d-flex">
                        <span class="date me-2">${new Date(
                         date
                        ).toDateString()}</span>
                        <span class="tags">${tags}</span>
                    </div>
                    <a href="#" class="btn btn-primary btn-sm mt-2">Read More</a>
                </div>
            </div>
        </div>
    `;
 __media.appendChild(postElement);
}

/**
 * Starts listening for new posts and populates posts lists.
 */
function startDatabaseQueries() {
 let recentPostsRef = $firebase_database_ref($firebase_database, "posts");
 var fetchPosts = function (postsRef) {
  $firebase_database_then(postsRef, function (data) {
   var posts = data.val();
   // Iterate through posts.
   for (var post in posts) {
    var title = posts[post].title;
    var body = posts[post].body;
    var author = posts[post].author || "A Member";
    var picture = posts[post].picture;
    var tags = posts[post].tags;
    var date = posts[post].date;
    // Create element for each post.
    if (__mediaLoading) __mediaLoading.style.display = "none";
    createPostElement(post, title, body, author, picture, tags, date);
   }
  });

  // postsRef.on("child_changed", function (data) {});
  // postsRef.on("child_removed", function (data) {});
 };

 // Fetching and displaying all posts of each sections.
 fetchPosts(recentPostsRef);
}

// Load
window.addEventListener("load", () => {
 startDatabaseQueries();

 // Intersection Observer using for media only
 if (window.IntersectionObserver) {
  const observer = new IntersectionObserver((entries) => {
   entries.forEach((entry) => {
    if (entry.isIntersecting) {
     __media.classList.add("d-none");
     __mediaLoading.style.display = "block";
     setTimeout(() => {
      __media.classList.remove("d-none");
      __mediaLoading.style.display = "none";
     }, 1000);
    }
   });
  });
  observer.observe(document.querySelector(".__c-section .__media"));
 }
});
