import '@babel/polyfill';
import { login, logout } from './login';
import { updateData } from './updateData';
import { displayMap } from './mapbox';
import { bookTour } from './stripe';

//DOM ELEMENT
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.nav__el--logout');
const updateUser = document.querySelector('.form-user-data');
const updatePassword = document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');


// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', el => {
    el.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logoutBtn) logoutBtn.addEventListener('click', logout);

if (updateUser) {
  updateUser.addEventListener('submit', el => {
    el.preventDefault();
    const formData = new FormData();
    formData.append('name',document.getElementById('name').value )
    formData.append('email', document.getElementById('email').value)
    formData.append('photo', document.getElementById('photo').files[0])

    updateData(formData, 'data');
  });
}

if (updatePassword) {
  updatePassword.addEventListener('submit', async el => {
    el.preventDefault();
    document.querySelector('.btn--password').textContent = 'Updating....'
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateData(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
    document.querySelector('.btn--password').textContent = 'Save Password'

  });
}

if(bookBtn)
  bookBtn.addEventListener('click', el => {
    el.target.textContent = 'Processing...'
    const { tourId } = el.target.dataset
    bookTour(tourId)
  })