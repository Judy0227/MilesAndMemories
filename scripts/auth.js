// Import the functions you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
  import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
  import { getStorage } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-storage.js";

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
  const analytics = getAnalytics(app);
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage(app);

  console.log("Firebase initialized");
/*function showMessage(message, divId) {
  const messageDiv = document.getElementById('signup-msg')
  messageDiv.style.display = 'block'
  messageDiv.innerText = message
  messageDiv.style.opacity = 1
  setTimeout(function() {
    messageDiv.style.opacity = 0
  }, 3000)
}*/
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
export function handleSignUp() {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
   const firstName = document.getElementById('firstName').value
   const lastName = document.getElementById('lastName').value
   createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    const user = userCredential.user
    const userId = user.uid
    const userData = {
      email: email,
      firstName: firstName,
      lastName: lastName,
       plan: 'free'
    }
    showMessage('Account created successfully', 'success')
    const docRef = doc(db, 'users', userId)
    return setDoc(docRef, userData)
    .then(() => {
     
      window.location.href = '/loginForm.html'
    })
    .catch((error) => {
    const errorCode = error.code;
    if (errorCode === "auth/email-already-in-use") {
      showMessage("Email Address Already Exists !!", "error");
    } else {
      showMessage("Unable to create User", "error");
      console.error("Signup error:", error.message);
    }
  });
  }) 
}
export function handleLogin() {
     const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  const auth = getAuth()
  signInWithEmailAndPassword(auth, email, password).then((userCredential)=>{
  showMessage('Login Successful', 'success')
const user = userCredential.user;
localStorage.setItem('loggedInUserId', user.uid);
      console.log('User ID saved to localStorage:', localStorage.getItem('loggedInUserId'));

      setTimeout(() => {
        window.location.href = '/homescreen.html';
      }, 100); // Optional delay to ensure storage writes
    })
.catch((error) => {
    const errorCode = error.code
    if(errorCode === 'auth/invalid-credential') {
        showMessage('Incorrect Email or Password', 'error')
    }
    else {
        showMessage('Account does not exist', 'error')
    }
})
}