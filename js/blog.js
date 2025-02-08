import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
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

document.addEventListener("DOMContentLoaded", async function () {
  const blogContainer = document.getElementById("blog_cont");

  const urlParams = new URLSearchParams(window.location.search);
  const blogId = urlParams.get("id");
  alert(blogId);

  if (!blogId) {
    console.error("No blog ID provided in the URL.");
    blogContainer.innerHTML = "<p>No blog ID provided.</p>";
    return;
  }

  try {
    const blogRef = doc(db, "blogs", blogId);
    const docSnap = await getDoc(blogRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log("Fetched Blog Data:", data); // Debugging log

      blogContainer.innerHTML = `
        <p><img src="${data.imageUrl || ""}" alt="" class="img-fluid"></p>
        <h2 class="mb-3">${data.title || ""}</h2>
        <p>${data.content || ""}</p>
        <h2 class="mb-3 mt-5">#2. ${data.subheading || ""}</h2>
        <p><img src="${data.subImageUrl || ""}" alt="" class="img-fluid"></p>
        <p>${data.subContent || ""}</p>

        <div class="about-author d-flex p-4 bg-light">
          <div class="bio mr-5">
            <img src="${data.authorImage || ""}" alt="Image placeholder" class="img-fluid mb-4">
          </div>
          <div class="desc">
            <h3>${data.author || ""}</h3>
            <p>${data.authorBio || ""}</p>
          </div>
        </div>
      `;
    } else {
      console.log("No such document found!");
      blogContainer.innerHTML = "<p>Blog post not found.</p>";
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    blogContainer.innerHTML = "<p>Error loading blog post.</p>";
  }
});
