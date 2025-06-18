function showMessage(message, type, duration = 2000) {
  const messageBox = document.getElementById('actionMessage');
  const messageText = document.getElementById('messageText');

  // Reset previous classes
  messageBox.className = '';
  messageBox.classList.add(type, 'show');
  messageText.textContent = message;

  // Make visible
  messageBox.classList.remove('hidden');

  return 'messageDisplayed';
}

// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsAaV_uiplyie0Ube0tZHJyzBZ-7fkR70",
  authDomain: "milesandmemories-194c5.firebaseapp.com",
  projectId: "milesandmemories-194c5",
  storageBucket: "milesandmemories-194c5.appspot.com",
  messagingSenderId: "463886821501",
  appId: "1:463886821501:web:3e679e228d0a6b97522914",
  measurementId: "G-ZMMQ1BQ48Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

const upgradeBtn = document.getElementById('upgradeBtn');

document.addEventListener('DOMContentLoaded', () => {
upgradeBtn.addEventListener("click", () => {
  const user = auth.currentUser;
  if (!user) return alert("Please log in first.");
   if (typeof PaystackPop === 'undefined') {
      showMessage("Payment SDK not loaded yet.");
      return;
    }

  showMessage("Redirecting to payment...", 'success');

  const handler = PaystackPop.setup({
    key: 'pk_test_2c31d30db828863f7a9d8549596c2940acf938bc',
    email: user.email,
    amount: 2500 * 100, // Paystack expects amount in kobo
    currency: "NGN",
    ref: '' + Math.floor(Math.random() * 1000000000 + 1),
    
    callback: function(response) {
      // Call async function separately
      handleUpgradeSuccess(user.uid);
    },

    onClose: function() {
      showMessage("Payment window closed.", 'error');
    }
  });

  handler.openIframe();
});
})

// Separate async function for Firestore update
async function handleUpgradeSuccess(uid) {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      plan: "premium",
      upgradedAt: new Date()
    });
    showMessage("Upgrade successful! Welcome to Premium.", 'success');
  } catch (err) {
    console.error("Error updating plan:", err);
    showMessage("Payment succeeded, but we couldn't upgrade your account. Contact support.", 'error');
  }
}
