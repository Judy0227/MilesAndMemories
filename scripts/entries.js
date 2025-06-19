// Import the functions you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
  import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
  import { getFirestore, getDoc, getDocs, doc, collection, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyAsAaV_uiplyie0Ube0tZHJyzBZ-7fkR70",
    authDomain: "milesandmemories-194c5.firebaseapp.com",
    projectId: "milesandmemories-194c5",
    storageBucket: "milesandmemories-194c5.appspot.com", // 🔧 Fixed typo: should be .app**spot**.com
    messagingSenderId: "463886821501",
    appId: "1:463886821501:web:3e679e228d0a6b97522914",
    measurementId: "G-ZMMQ1BQ48Y"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const db = getFirestore();

const recentContainer = document.getElementById('entryContainer');
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const entriesRef = collection(db, "users", user.uid, "journalEntries");
    const recentQuery = query(entriesRef, orderBy("date", "desc"));
    const snapshot = await getDocs(recentQuery);

    if (!snapshot.empty) {
      snapshot.forEach((doc) => {
        const entry = doc.data();
        const article = document.createElement("article");
        article.onclick = () => {
          window.location.href = `/eachEntry.html?id=${doc.id}`;
        };
console.log(entry)
        article.innerHTML = `
          <div class="entry-item">
                <div class="img-container">
                    <img src="${entry.imageUrls}" id="image" class="image">
                </div>
                <div>
                    <h3 id="title">${entry.title}</h3>
                    <div class="date-place">
                        <span id="place" class="place"><i class="fa fa-map-marker" aria-hidden="true"></i>${entry.places}</span>
                        <span id="date" class="date"><i class="fa fa-calendar-o" aria-hidden="true"></i>${entry.date}</span>
                    </div>
                    <p class="story" id="story">
                        ${entry.story?.slice(0, 100)}...
                    </p>
                </div>
            </div>
        `;
        recentContainer.appendChild(article);
      });
    } else {
      recentContainer.innerHTML = `<p>No entries yet.</p>`;
    }
  }
})
