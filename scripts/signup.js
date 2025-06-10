
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
const submitButton = document.getElementById('submit');
submitButton.addEventListener('click', function(e) {
    e.preventDefault();
    const firstName = document.getElementById('firstName').value;
 const lastName = document.getElementById('lastName').value;
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    window.location.href = '/homescreen.html';
})
