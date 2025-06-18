import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  doc,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAsAaV_uiplyie0Ube0tZHJyzBZ-7fkR70",
  authDomain: "milesandmemories-194c5.firebaseapp.com",
  projectId: "milesandmemories-194c5",
  storageBucket: "milesandmemories-194c5.appspot.com",
  messagingSenderId: "463886821501",
  appId: "1:463886821501:web:3e679e228d0a6b97522914",
  measurementId: "G-ZMMQ1BQ48Y"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const cloudName = "dlyzyzguc";
const uploadPreset = "journalEntries";
function showMessage(message, type) {
  const messageBox = document.getElementById('actionMessage');
  const messageText = document.getElementById('messageText');

  // Reset previous classes
  messageBox.className = '';
  messageBox.classList.add(type, 'show');
  messageText.textContent = message;

  // Make visible
  messageBox.classList.remove('hidden');

}
const form = document.getElementById("newEntryForm");
const uploadMsg = document.getElementById("uploadingMessage");
const publishBtn = document.getElementById('publishBtn')

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  uploadMsg.classList.remove('hidden');
  publishBtn.disabled = true;
  publishBtn.textContent = "Uploading...";

  const title = document.getElementById('title').value.trim();
  const places = document.getElementById('place').value.trim();
  const story = document.getElementById('story').value.trim();
  const date = document.getElementById('date').value;
  const files = document.getElementById('images').files;

  const user = auth.currentUser;
  if (!user) {
    showMessage("You must be logged in to submit an entry.", 'error');
    return;
  }

  // ✅ Step 1: Get user plan
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    showMessage("User data not found.", 'error');
    return;
  }

  const plan = userSnap.data().plan || "free";

  // ✅ Step 2: Check existing number of entries
  const entriesRef = collection(db, "users", user.uid, "journalEntries");
  const entriesSnap = await getDocs(entriesRef);
  const entryCount = entriesSnap.size;

  if (plan === "free" && entryCount >= 10) {
    showMessage("You have reached the 10-entry limit for free users. Upgrade to premium for unlimited entries.", 'error');
    return;
  }

  // ✅ Step 3: Upload images
  let imageUrls = [];

  if (files.length > 0) {
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);

      try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: 'POST',
          body: formData
        });

        if (!res.ok) throw new Error('Image upload failed');

        const data = await res.json();
        imageUrls.push(data.secure_url);
      } catch (err) {
        console.error("Image upload error:", err);
        showMessage("Image upload failed. Please try again.", 'error');
        return;
      }
    }
  }

  // ✅ Step 4: Save journal entry
  try {
    const docRef = await addDoc(collection(db, "users", user.uid, "journalEntries"), {
  title,
  places,
  story,
  date,
  imageUrls,
  timestamp: new Date()
});
    console.log("Saved journal with ID:", docRef.id);

    form.reset();
    const preview = document.getElementById('imagePreview');
    if (preview) preview.innerHTML = '';

    showMessage("Journal entry submitted successfully!", 'success');
  } catch (err) {
    console.error("Firestore error:", err);
    showMessage("Failed to save journal entry.", 'error');
  }
  finally {
    uploadMsg.classList.add('hidden');
    publishBtn.disabled = false;
    publishBtn.textContent = "Publish";
  }
});

