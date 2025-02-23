import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  orderBy,
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
  if (!db) {
    console.error("Firebase not initialized!");
    return;
  }

  const causesContainer = document.getElementById("causes-container");

  // alert(causesContainer);

  try {
    const causesQuery = query(collection(db, "causes"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(causesQuery);

    let causesHTML = "";

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const progress = ((data.currentAmount / data.goalAmount) * 100).toFixed(2); // Calculate progress percentage
      const remainingAmount = (data.goalAmount - data.currentAmount).toLocaleString(); // Format amount with commas

      causesHTML += `
                  <div class="col-md-6 col-lg-3">
          <div class="causes causes-2 text-center ">
            <a href="#" class="img w-100" loading="lazy"  style="background-image: url('${
              data.imageURL || "images/default.jpg"
            }');" loading="lazy"></a>
            <div class="text p-3">
              <h2><a href="#">${data.title || "No Title"}</a></h2>
              <p>${data.description || "No description available."}</p>
              <div class="goal mb-4">
                <p><span>$${remainingAmount || "0.00"}</span> to go</p>
                <div class="progress" style="height:20px">
                  <div class="progress-bar progress-bar-striped" style="width:${
                    progress || "0"
                  }%; height:20px">
                    ${progress || "0"}%
                  </div>
                </div>
              </div>
              <p><button onclick="handlePop(event)" class="btn btn-light w-100 donate-btn" data-cause="${
                data.title || "Cause"
              }">Donate Now</button></p>
            </div>
          </div>
        </div>
              `;
    });

    causesContainer.innerHTML = causesHTML;
  } catch (error) {
    console.error("Error fetching causes:", error);
  }
});
