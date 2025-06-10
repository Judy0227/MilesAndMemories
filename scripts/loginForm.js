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
 const submitButton = document.getElementById('submit');
submitButton.addEventListener('click', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (email && password) {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        window.location.href = '/homescreen.html';
    } else {
        alert('Please fill in all fields.');
    }
  })
