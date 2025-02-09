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

document.addEventListener("DOMContentLoaded", async function () {
  if (!db) {
    console.error("Firebase not initialized!");
    return;
  }

  const causesContainer = document.getElementById("causes-container");

  alert(causesContainer);

  //   try {
  //     const querySnapshot = await getDocs(collection(db, "causes"));
  //     let causesHTML = "";
  //     alert(causesHTML);

  //     querySnapshot.forEach((doc) => {
  //       const data = doc.data();
  //       const progress = ((data.currentAmount / data.goalAmount) * 100).toFixed(2); // Calculate progress percentage
  //       const remainingAmount = (data.goalAmount - data.currentAmount).toLocaleString(); // Format amount with commas
  //       alert(progress);

  //       causesHTML += `
  //                 <div class="col-md-6 col-lg-3">
  //           <div class="causes causes-2 text-center ftco-animate">
  //             <a href="#" class="img w-100" style="background-image: url('${
  //               data.imageURL || ""
  //             }');" loading="lazy"></a>
  //             <div class="text p-3">
  //               <h2><a href="#">${data.title || ""}</a></h2>
  //               <p>${data.description || ""}</p>
  //               <div class="goal mb-4">
  //                 <p><span>$${remainingAmount || ""}</span> to go</p>
  //                 <div class="progress" style="height:20px">
  //                   <div class="progress-bar progress-bar-striped" style="width:${
  //                     progress || ""
  //                   }%; height:20px">${progress || ""}%
  //                   </div>
  //                 </div>
  //               </div>
  //               <p><a href="#donate" class="btn btn-light w-100">Donate Now</a></p>
  //             </div>
  //           </div>
  //         </div>
  //             `;
  //     });

  //     causesContainer.innerHTML = causesHTML;
  //   } catch (error) {
  //     console.error("Error fetching causes:", error);
  //   }

  try {
    const testRef = collection(db, "causes");
    const snapshot = await getDocs(testRef);

    console.log("Documents found:", snapshot.size);
  } catch (error) {
    console.error("Firestore error:", error);
  }
});
