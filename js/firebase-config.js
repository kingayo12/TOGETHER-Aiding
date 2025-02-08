import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  collection,
  getDocs,
  getFirestore,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSkqov9vc9QU4H_lue4cnoIxtTeAwsiZE",
  authDomain: "blogpost-26dcb.firebaseapp.com",
  projectId: "blogpost-26dcb",
  storageBucket: "blogpost-26dcb.firebasestorage.app",
  messagingSenderId: "557297913730",
  appId: "1:557297913730:web:4e2345a590760ee96a899b",
  measurementId: "G-WT82CB3Y4D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function timeSince(date) {
  if (!(date instanceof Date)) {
    // Convert Firestore Timestamp to JavaScript Date
    date = new Date(date.toDate());
  }

  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    const months = Math.floor((seconds % 31536000) / 2592000);
    return `${interval} yr${interval > 1 ? "s" : ""} ${
      months ? months + " month" + (months > 1 ? "s" : "") : ""
    }`;
  }

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return date.toLocaleString("en-US", { month: "long" }); // Returns "January", "February", etc.
  }

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + " day" + (interval > 1 ? "s" : "");
  }

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + " hr" + (interval > 1 ? "s" : "");
  }

  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + " min" + (interval > 1 ? "s" : "");
  }

  return Math.floor(seconds) + " sec" + (seconds > 1 ? "s" : "");
}

function formatDate(date) {
  if (!(date instanceof Date)) {
    date = new Date(date.toDate()); // Convert Firestore Timestamp to JS Date
  }

  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long", // e.g., January, February
    year: "numeric", // e.g., 2025
  });
}

document.addEventListener("DOMContentLoaded", async function () {
  if (!db) {
    console.error("Firebase not initialized!");
    return;
  }

  const blogContainer = document.getElementById("blog-container");

  try {
    const querySnapshot = await getDocs(collection(db, "blogs"));
    let blogHTML = "";

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const blogId = doc.id; // Get the Firestore document ID
      //   const date = new Date(data.date);

      blogHTML += `
                <div class="col-md-6 col-lg-3 d-flex " id="${blogId}">
                    <div class="blog-entry align-self-stretch">
                        <a href="blog-single.html?id=${blogId}" class="block-20" style="background-image: url('${
        data.imageURL
      }');"></a>
                        <div class="text p-4">
                            <div class="meta mb-2">
                                <div><a href="#">${formatDate(data.date)}</a></div>
                                <div><a href="#">${data.author}</a></div>
                                <div><a href="#" class="meta-chat"><span class="fa fa-comment"></span> ${
                                  data.commentsCount
                                }</a></div>
                            </div>
                            <h3 class="heading"><a href="blog-single.html?id=${blogId}">${
        data.title
      }</a></h3>
                            <p>${data.description}</p>
                            <p><a href="blog-single.html?id=${blogId}" class="btn btn-secondary">Read more</a></p>
                        </div>
                    </div>
                </div>
            `;
    });

    blogContainer.innerHTML = blogHTML;
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }
});
