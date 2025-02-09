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
  const blogContainer = document.querySelector("#blogCont");

  // Get blog ID from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const blogId = urlParams.get("id");

  if (!blogId) {
    console.error("No blog ID provided in the URL.");
    blogContainer.innerHTML = "<p>No blog ID provided.</p>";
    return;
  }

  try {
    const blogRef = doc(db, "blogs", blogId); // Reference the blog post
    const docSnap = await getDoc(blogRef); // Fetch document from Firestore

    if (docSnap.exists()) {
      const data = docSnap.data();

      // Check for missing fields and provide defaults
      const imageURL = data.imageURL || "default.jpg";
      const title = data.title || "Untitled Blog";
      const content = data.content || "No content available.";
      const subheading = data.subheading || "";
      const subImageUrl = data.subImageUrl || "";
      const subContent = data.subContent || "";
      const authorImage = data.authorImage || "default-author.jpg";
      const author = data.author || "Anonymous";
      const authorBio = data.authorBio || "No bio available.";
      const formattedDate = formatDate(data.date);

      blogContainer.innerHTML = `
        <p><img src="${imageURL}" alt="" class="img-fluid"></p>
        <h2 class="mb-3">${title}</h2>
        <p><strong>Published on: ${formattedDate}</strong></p>
        <p>${content}</p>

        ${subheading ? `<h2 class="mb-3 mt-5">#2. ${subheading}</h2>` : ""}
        ${subImageUrl ? `<p><img src="${subImageUrl}" alt="" class="img-fluid"></p>` : ""}
        ${subContent ? `<p>${subContent}</p>` : ""}

        <div class="about-author d-flex p-4 bg-light">
          <div class="bio mr-5">
            <img src="${authorImage}" alt="Author Image" class="img-fluid mb-4">
          </div>
          <div class="desc">
            <h3>${author}</h3>
            <p>${authorBio}</p>
          </div>
        </div>
      `;
    } else {
      console.log("No such document!");
      blogContainer.innerHTML = "<p>Blog post not found.</p>";
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    blogContainer.innerHTML = "<p>Error loading blog post.</p>";
  }
});
