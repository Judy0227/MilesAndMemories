// Import the functions you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
  import { getAuth, onAuthStateChanged, updateEmail, signOut } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
  import { getFirestore, getDoc, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

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
          document.getElementById('userName').innerText= `${userData.firstName} ${userData.lastName}`
           document.getElementById('userEmail').innerText= `${userData.email}`
           const signUpDate = new Date(user.metadata.creationTime);
    document.getElementById("joinDate").textContent = `Joined on: ${signUpDate.toDateString()}`;
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
function showMessage(message, type, duration = 2000) {
  const messageBox = document.getElementById('actionMessage');
  const messageText = document.getElementById('messageText');

  // Reset previous classes
  messageBox.className = '';
  messageBox.classList.add(type, 'show');
  messageText.textContent = message;

  // Make visible
  messageBox.classList.remove('hidden');

  return 'messageDisplayed'
}

// Elements
const editBtn = document.getElementById('editProfile');
const modal = document.getElementById('editProfileModal');
const form = document.getElementById('editProfileForm');
const cancelBtn = document.getElementById('cancelEdit');
const nameInput = document.getElementById('editName');
const emailInput = document.getElementById('editEmail');

// Open modal and prefill values
editBtn.addEventListener('click', async () => {
  const user = auth.currentUser;
  if (!user) return;

  const userDoc = await getDoc(doc(db, "users", user.uid));
  if (userDoc.exists()) {
    const userData = userDoc.data();
    nameInput.value = userData.name || "";
    emailInput.value = user.email;
    modal.classList.remove("hidden");
  }
});

// Cancel button
cancelBtn.addEventListener('click', () => {
  modal.classList.add("hidden");
});

// Handle form submit
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const user = auth.currentUser;
  if (!user) return;

  const newName = nameInput.value.trim();
  const newEmail = emailInput.value.trim();

  try {
    // Update Firebase Auth email
    if (user.email !== newEmail) {
      await updateEmail(user, newEmail);
    }

    // Update Firestore profile
    await updateDoc(doc(db, "users", user.uid), {
      name: newName
    });

    showMessage("Profile updated successfully.", 'success');
    modal.classList.add("hidden");
  } catch (error) {
    console.error("Update failed:", error);
    showMessage(`Error updating profile: ${error.message}`, 'error');
  }
});
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      showMessage("You’ve been logged out.", 'success');
      window.location.href = "/loginForm.html"; // Redirect to login or home page
    })
    .catch((error) => {
      console.error("Logout error:", error);
      showMessage("An error occurred while logging out.", 'error');
    });
});
const fileInput = document.getElementById('file-input');
const profilePic = document.getElementById('profileImg');
const cloudName = "dlyzyzguc";
const uploadPreset = "journalEntries";

onAuthStateChanged(auth, async (user) => {
  if (!user) return;

  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  // ✅ Load existing profile picture if it exists
  if (userSnap.exists()) {
    const data = userSnap.data();
    if (data.profilePicture) {
      profilePic.src = data.profilePicture;
    }
  }

  // ✅ Handle profile picture upload
  fileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset); // 🔁 Typo fixed (was missing underscore)

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      const imageUrl = data.secure_url;

      await updateDoc(userRef, {
        profilePicture: imageUrl
      });

      profilePic.src = imageUrl;
      showMessage('Profile picture updated successfully!', 'success');

    } catch (err) {
      console.error('Image upload failed:', err);
      showMessage('Failed to update profile picture!', 'error');
    }
  });
});
