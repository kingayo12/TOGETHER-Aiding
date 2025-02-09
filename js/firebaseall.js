import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  orderBy,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Firebase Configuration
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

// Function to format date
function formatDate(date) {
  if (!(date instanceof Date)) {
    date = new Date(date.toDate()); // Convert Firestore Timestamp to JS Date
  }
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Pagination variables
const postsPerPage = 8;
let allPosts = [];
let currentPage = 1;

// Function to fetch blog posts
async function fetchBlogPosts() {
  try {
    const q = query(collection(db, "blogs"), orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    allPosts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (allPosts.length === 0) {
      document.getElementById("blog-container").innerHTML =
        "<p class='text-center'>No blog posts available.</p>";
      document.querySelector(".block-27 ul").innerHTML = "";
      return;
    }

    renderPagination();
    displayPosts(currentPage);
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }
}

// Function to display posts for the current page
function displayPosts(page) {
  const blogContainer = document.getElementById("blog-container");
  blogContainer.innerHTML = "";

  let start = (page - 1) * postsPerPage;
  let end = start + postsPerPage;
  let paginatedPosts = allPosts.slice(start, end);

  paginatedPosts.forEach((post) => {
    blogContainer.innerHTML += `
      <div class="col-md-6 col-lg-3 d-flex " id="${post.id}">
          <div class="blog-entry align-self-stretch">
              <a href="blog-single.html?id=${
                post.id
              }" class="block-20" style="background-image: url('${post.imageURL}');"></a>
              <div class="text p-4">
                  <div class="meta mb-2">
                      <div><a href="#">${formatDate(post.date)}</a></div>
                      <div><a href="#">${post.author}</a></div>
                      <div><a href="#" class="meta-chat"><span class="fa fa-comment"></span> ${
                        post.commentsCount
                      }</a></div>
                  </div>
                  <h3 class="heading"><a href="blog-single.html?id=${post.id}">${
      post.title
    }</a></h3>
                  <p>${post.description}</p>
                  <p><a href="blog-single.html?id=${
                    post.id
                  }" class="btn btn-secondary">Read more</a></p>
              </div>
          </div>
      </div>
    `;
  });
}

// Function to render pagination
function renderPagination() {
  const paginationContainer = document.querySelector(".block-27 ul");
  paginationContainer.innerHTML = "";
  let totalPages = Math.ceil(allPosts.length / postsPerPage);

  if (totalPages > 1) {
    paginationContainer.innerHTML += `<li><a href="#" data-page="${
      currentPage - 1
    }" class="prev">&lt;</a></li>`;

    for (let i = 1; i <= totalPages; i++) {
      paginationContainer.innerHTML += `<li class="${i === currentPage ? "active" : ""}">
        <a href="#" data-page="${i}">${i}</a>
      </li>`;
    }

    paginationContainer.innerHTML += `<li><a href="#" data-page="${
      currentPage + 1
    }" class="next">&gt;</a></li>`;
  }
}

// Event listener for pagination
document.querySelector(".block-27 ul").addEventListener("click", function (e) {
  if (e.target.tagName === "A") {
    let page = parseInt(e.target.dataset.page);
    if (page > 0 && page <= Math.ceil(allPosts.length / postsPerPage)) {
      currentPage = page;
      displayPosts(currentPage);
      renderPagination();
    }
  }
});

// Load blog posts on page load
document.addEventListener("DOMContentLoaded", fetchBlogPosts);
