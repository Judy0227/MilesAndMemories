// Import the functions you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
  import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

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

const entriesContainer = document.getElementById("entriesContainer");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    entriesContainer.innerHTML = "<p>Please log in to view your entries.</p>";
    return;
  }

  const entriesRef = collection(db, "users", user.uid, "journalEntries");

  try {
    const snapshot = await getDocs(entriesRef);

    if (snapshot.empty) {
      entriesContainer.innerHTML = "<p>No entries found.</p>";
      return;
    }

    snapshot.forEach(doc => {
      const entry = doc.data();

      const entryDiv = document.createElement("div");
      entryDiv.classList.add("entry");

      const imagesHTML = (entry.imageUrl || []).map(url => `<img src="${url}" alt="Entry Image" />`).join('');

      entryDiv.innerHTML = `
        <h1 id="entryTitle">${entry.title}</h1>
        <div class="meta" id="entryMeta">${entry.date} • ${entry.places}</div>
        <div class="story" id="entryStory">${entry.story}</div>
        <div class="image-grid" id="entryImages">${imagesHTML}</div>
      `;

      entriesContainer.appendChild(entryDiv);
    });

  } catch (error) {
    console.error("Error fetching journal entries:", error);
    entriesContainer.innerHTML = "<p>Error loading entries.</p>";
  }
});
