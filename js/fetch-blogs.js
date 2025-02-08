import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  collection,
  getDocs,
  getFirestore,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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

      blogHTML += `
                <div class="col-md-6 col-lg-3 d-flex ftco-animate" id="${blogId}">
                    <div class="blog-entry align-self-stretch">
                        <a href="blog-single.html?id=${blogId}" class="block-20" style="background-image: url('/blog/${data.imageURL}');"></a>
                        <div class="text p-4">
                            <div class="meta mb-2">
                                <div><a href="#">${data.date}</a></div>
                                <div><a href="#">${data.author}</a></div>
                                <div><a href="#" class="meta-chat"><span class="fa fa-comment"></span> ${data.commentsCount}</a></div>
                            </div>
                            <h3 class="heading"><a href="blog-single.html?id=${blogId}">${data.title}</a></h3>
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
