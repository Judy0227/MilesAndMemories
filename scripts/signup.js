
document.addEventListener('DOMContentLoaded', () => {
   const toggles = document.querySelectorAll('.toggle-password');
 
   toggles.forEach(toggle => {
     toggle.addEventListener('click', function () {
       const targetId = this.dataset.target;
       const passwordInput = document.getElementById(targetId);
       const icon = this.querySelector('i');
 
       if (passwordInput.type === 'password') {
         passwordInput.type = 'text';
         icon.classList.remove('fa-eye-slash');
         icon.classList.add('fa-eye');
       } else {
         passwordInput.type = 'password';
         icon.classList.remove('fa-eye');
         icon.classList.add('fa-eye-slash');
       }
     });
   });
 });
 const email = document.getElementById('email');
 const password = document.getElementById('password');
 const confirmPassword = document.getElementById('confirmPassword')
 const error = document.getElementById('error');

 email.addEventListener('blur', validateEmail);
 function validateEmail() {
    
    const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/

    if (!re.test(email.value)) {
        const emailError = document.getElementById('emailError')
        emailError.textContent= 'Please input a valid Email';
        email.classList.add('error')
    }
    if (email.classList.contains('error')) {
        if (re.test(email.value)) {
          email.classList.remove('error');
          emailError.textContent = "";
        }
      }
   
}
password.addEventListener('blur', validatePassword);
 function validatePassword() {
    
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/

    if (!re.test(password.value)) {
  const passwordError = document.getElementById('passwordError')
        passwordError.textContent= 'Password should be at least 6 characters long and include a mix of uppercase and lowercase letters, numbers, and symbols';
        password.classList.add('error')
    }  
    if (password.classList.contains('error')) {
        if (re.test(password.value)) {
          password.classList.remove('error');
          passwordError.textContent = "";
        }
      }
    
}
confirmPassword.addEventListener('blur', validateConfirmPassword)
function validateConfirmPassword() {
  if (password.value !== confirmPassword.value) {
    const confirmError = document.getElementById('confirmError')
    confirmError.textContent = 'Password does not match'
    confirmPassword.classList.add('error')
      } 
      if (confirmPassword.classList.contains('error')) {
        if (password.value === confirmPassword.value) {
          confirmPassword.classList.remove('error');
          confirmError.textContent = "";
        }
      }
      
}
import { handleSignUp } from './auth.js';
const form = document.getElementById('signupForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  handleSignUp();
});
