import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getFirestore, doc, getDoc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

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
const db = getFirestore(app);
const auth = getAuth(app);

const params = new URLSearchParams(window.location.search);
const entryId = params.get('id');
const cloudName = "dlyzyzguc";
const uploadPreset = "journalEntries";

// Message popup
function showMessage(message, type) {
  const messageBox = document.getElementById('actionMessage');
  const messageText = document.getElementById('messageText');
  messageBox.className = '';
  messageBox.classList.add(type, 'show');
  messageText.textContent = message;
  messageBox.classList.remove('hidden');
}

onAuthStateChanged(auth, async (user) => {
  if (!user || !entryId) return;

  const entryRef = doc(db, 'users', user.uid, 'journalEntries', entryId);
  const snapshot = await getDoc(entryRef);

  if (!snapshot.exists()) {
    showMessage("Entry not found.", 'error');
    return;
  }

  const entry = snapshot.data();

  // Pre-fill form
  document.getElementById('title').value = entry.title;
  document.getElementById('place').value = entry.places;
  document.getElementById('story').value = entry.story;
  document.getElementById('date').value = entry.date;

  const uploadBox = document.getElementById('uploadBox');
  const fileInput = document.getElementById('images');
  const imagePreviewContainer = document.getElementById('imagePreviewContainer');
  let uploadedImages = [...(entry.imageUrls || [])]; // Pre-fill with old images

  // Display existing images
  uploadedImages.forEach(url => addImagePreview(url));

  // Trigger file input
  uploadBox.addEventListener('click', () => fileInput.click());

  // Handle new uploads
  fileInput.addEventListener('change', async () => {
    const files = fileInput.files;

    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);

      try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: 'POST',
          body: formData
        });

        const data = await res.json();
        uploadedImages.push(data.secure_url);
        addImagePreview(data.secure_url);
      } catch (err) {
        console.error("Image upload failed:", err);
        showMessage("Failed to upload image.", 'error');
      }
    }

    fileInput.value = '';
  });

  // Preview image with remove button
  function addImagePreview(imageUrl) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('preview-wrapper');

    const img = document.createElement('img');
    img.src = imageUrl;
    img.classList.add('preview-image');

    const removeBtn = document.createElement('button');
    removeBtn.textContent = '×';
    removeBtn.classList.add('remove-btn');
    removeBtn.onclick = () => {
      wrapper.remove();
      uploadedImages = uploadedImages.filter(url => url !== imageUrl);
    };

    wrapper.appendChild(img);
    wrapper.appendChild(removeBtn);
    imagePreviewContainer.appendChild(wrapper);
  }

  // Delete journal entry
  document.getElementById('deleteBtn').addEventListener('click', async () => {
    if (confirm("Are you sure you want to delete this entry?")) {
      await deleteDoc(entryRef);
      showMessage("Entry deleted", 'success');
      window.location.href = "/entries.html";
    }
  });

  // Update journal entry
  document.getElementById('updateBtn').addEventListener('click', async () => {
    const updated = {
      title: document.getElementById('title').value.trim(),
      places: document.getElementById('place').value.trim(),
      story: document.getElementById('story').value.trim(),
      date: document.getElementById('date').value,
      imageUrls: uploadedImages,
      timestamp: new Date()
    };

    await updateDoc(entryRef, updated);
    showMessage("Entry updated!", 'success');
  });
});
