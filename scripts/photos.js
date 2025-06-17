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
const grid = document.getElementById('photosGrid');

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const entriesRef = collection(db, "users", user.uid, "journalEntries");
    const snapshot = await getDocs(entriesRef);

    snapshot.forEach(doc => {
      const entry = doc.data();
      if (Array.isArray(entry.imageUrls)) {
        entry.imageUrls.forEach(url => {
          const card = document.createElement('div');
          card.className = 'card';
          card.innerHTML = `<img src="${url}" alt="Photo">`;
          grid.appendChild(card);
        });
      }
    });
  } else {
    grid.innerHTML = "<p>Please log in to view your photos.</p>";
  }
});
