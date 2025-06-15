document.querySelectorAll('.toggle-password').forEach(toggle => {
   toggle.addEventListener('click', function () {
     const targetInput = document.getElementById(this.dataset.target);
     const icon = this.querySelector('i');
 
     if (targetInput.type === 'password') {
       targetInput.type = 'text';
       icon.classList.remove('fa-eye-slash');
       icon.classList.add('fa-eye');
     } else {
       targetInput.type = 'password';
       icon.classList.remove('fa-eye');
       icon.classList.add('fa-eye-slash');
     }
   });
 });
 const email = document.getElementById('email')
 const password = document.getElementById('password')
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
        passwordError.textContent= 'Password should be at least 12 characters long and include a mix of uppercase and lowercase letters, numbers, and symbols';
        password.classList.add('error')
    }  
    if (password.classList.contains('error')) {
        if (re.test(password.value)) {
          password.classList.remove('error');
          passwordError.textContent = "";
        }
      }
    
}
import { handleLogin } from './auth.js';

document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  handleLogin();
});
