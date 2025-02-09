import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  collection,
  getDocs,
  getFirestore,
  doc,
  getDoc,
  query,
  orderBy,
  limit,
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

// document.addEventListener("DOMContentLoaded", async function () {
//   const blogList = document.getElementById("blog-list");

//   try {
//     const q = query(collection(db, "blogs"), limit(1)); // Fetch only ONE blog
//     const querySnapshot = await getDocs(q);

//     querySnapshot.forEach((doc) => {
//       const data = doc.data();
//       console.log("Data from Firestore:", data); // Check the data in the console

//       const title = data.title || "No Title Found"; // Provide a default

//       blogList.innerHTML = `<h3>${title}</h3>`; // Display ONLY the title
//     });
//   } catch (error) {
//     console.error("Error fetching blogs:", error);
//     blogList.innerHTML = `<p>Error: ${error.message}</p>`; // Display error on the page
//   }
// });

document.addEventListener("DOMContentLoaded", async function () {
  if (!db) {
    console.error("Firebase not initialized!");
    return;
  }

  const blogList = document.getElementById("blog-list");

  try {
    const q = query(collection(db, "blogs"), orderBy("date", "desc"), limit(3));
    const querySnapshot = await getDocs(q);
    let blogHTML = "";

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const blogId = doc.id;

      blogHTML += `
              <div class="block-21 mb-4 d-flex" id="${blogId}">
                  <a class="blog-img mr-4" style="background-image: url('${data.imageURL}');"></a>
                  <div class="text">
                      <h3 class="heading"><a href="blog-single.html?id=${blogId}">${
        data.title || "no title"
      }</a></h3>
                      <div class="meta">
                          <div><a href="#"><span class="fa fa-calendar"></span> ${formatDate(
                            data.date,
                          )}</a></div>
                          <div><a href="#"><span class="fa fa-user"></span> ${
                            data.author || "no author"
                          }</a></div>
                          <div><a href="#"><span class="fa fa-commenting"></span> ${
                            data.commentsCount
                          }</a></div>
                      </div>
                  </div>
              </div>
          `;
    });

    blogList.innerHTML = blogHTML;
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }
});
