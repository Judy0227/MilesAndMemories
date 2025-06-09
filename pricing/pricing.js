const firstName = localStorage.getItem('firstName') || 'Guest';
const lastName = localStorage.getItem('lastName') || 'User';
if (firstName && lastName) {
  document.getElementById('profile-name').textContent = `${firstName} ${lastName}`;
}
