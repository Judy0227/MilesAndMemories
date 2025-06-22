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
  onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId')
    console.log(loggedInUserId)
    if (loggedInUserId) {
      const docRef = doc(db, 'users', loggedInUserId)
      getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          document.getElementById('loggedUserFName').innerText= userData.firstName
          document.getElementById('loggedUserLName').innerText= userData.lastName
        }
        else {
          document.getElementById('profile-name').innerHTML = 'GuestUser'
        }
      })
      .catch((error) => {
        console.log('Error getting user')
      })
    }
  })

// Close modal when button is clicked
const modal = document.getElementById('welcomeModal')
onAuthStateChanged(auth, (user) => {
  if (user) {
    const hasVisited = localStorage.getItem(`welcomeShown_${user.uid}`);

    if (!hasVisited) {
      modal.classList.remove('hidden');
    }
  }
});


closeModalBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
  
  const user = auth.currentUser;
  if (user) {
    localStorage.setItem(`welcomeShown_${user.uid}`, 'true');
  }
});
const entriesCountEl = document.getElementById('entriesCount');
const placesCountEl = document.getElementById('placesCount');
const photosCountEl = document.getElementById('photosCount');

const entriesBox = document.getElementById('entriesBox');
const placesBox = document.getElementById('placesBox');
const photosBox = document.getElementById('photosBox');

onAuthStateChanged(auth, async (user) => {
  if (!user) return;

  const entriesRef = collection(db, 'users', user.uid, 'journalEntries');
  const snapshot = await getDocs(entriesRef);

  const entries = [];
  const placesSet = new Set();
  let totalPhotos = 0;
    

  snapshot.forEach(doc => {
    const data = doc.data();
    entries.push(data);
    if (data.places) {
      placesSet.add(data.places);
    }
    if (Array.isArray(data.imageUrls)) {
  totalPhotos += data.imageUrls.length;
} else if (typeof data.imageUrls === 'string') {
  totalPhotos += 1;
}

  entriesCountEl.textContent = entries.length;
  placesCountEl.textContent = placesSet.size;
  photosCountEl.textContent = totalPhotos;

  // Add click navigation
  entriesBox.onclick = () => window.location.href = 'entries.html';
  placesBox.onclick = () => window.location.href = 'places.html';
  photosBox.onclick = () => window.location.href = 'photos.html';
});
})
const recentContainer = document.getElementById('entryContainer');
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const entriesRef = collection(db, "users", user.uid, "journalEntries");
    const recentQuery = query(entriesRef, orderBy("date", "desc"), limit(2));
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
      <img src="${entry.imageUrls?.[0] || '/images/placeholder.jpg'}" id="image" class="image">
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
  </div>`;
        recentContainer.appendChild(article);
      });
    } else {
      recentContainer.innerHTML = `<p>No entries yet.</p>`;
    }
  }
})
const homeProfilePic = document.getElementById('profileImg'); // ⬅️ The <img> in your homescreen

onAuthStateChanged(auth, async (user) => {
  if (!user) return;

  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const data = userSnap.data();
    if (data.profilePicture) {
      homeProfilePic.src = data.profilePicture;
    } else {
      homeProfilePic.src = "/default-profile.png"; // fallback if none
    }
  }
});
