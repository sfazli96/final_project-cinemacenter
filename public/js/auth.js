// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    const doc = db1.collection('users').doc(user.uid);
    doc.get().then((obj) => {
      if (!obj.exists) { console.log('no doc exists') }
      else {
        console.log("Currently logged in user: ");
        console.log(obj.data());
      }
    })
  }
  else {
    console.log('no user logged in')
  }
})

// signup
function registerNewUser() {
  // const signupForm = document.getElementById('user-reg-button')
  // signupForm.addEventListener('click', (e) => {
  //   e.preventDefault();

  // get user info
  const username = document.getElementById('user-reg-username').value
  const email = document.getElementById('user-reg-email').value
  const password = document.getElementById('user-reg-password').value
  const confirmPassword = document.getElementById('user-reg-confirm-password').value
  const firstName = document.getElementById('user-reg-first-name').value
  const lastName = document.getElementById('user-reg-last-name').value
  const occupation = document.getElementById('user-reg-occupation').value
  const location = document.getElementById('user-reg-location').value
  const favoriteGenre = document.getElementById('user-reg-genre').value

  if (password != confirmPassword)
  {
    alert('error: passwords do not match');
    return;
  }

  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    return db1.collection('users').doc(cred.user.uid).set({
      username: username,
      firstName: firstName,
      lastName: lastName,
      location: location,
      occupation: occupation,
      favoriteGenre: favoriteGenre,
      biography: "Your biography is empty. Edit your profile to let people know more about you!",
    });
  })
  .then(() => {
    // // close the signup modal & reset form
    // const modal = document.querySelector('#modal-signup');
    // M.Modal.getInstance(modal).close();
    // signupForm.reset();
    console.log('successfully added user with username: ' + username);
    window.location = '/home';
  });
}


// // logout
// const logout = document.getElementById('logout-button');
// console.log(logout)
// logout.addEventListener('click', (e) => {
//   e.preventDefault();
//   console.log('clicked logout')
//   // auth.signOut().then(() => {
//   // })
// });

// login
// const loginForm = document.querySelector('#login-form');
// loginForm.addEventListener('submit', (e) => {
//   e.preventDefault();
  
//   // get user info
//   const email = loginForm['login-email'].value;
//   const password = loginForm['login-password'].value;

//   // log the user in
//   auth.signInWithEmailAndPassword(email, password).then((cred) => {
//     // close the signup modal & reset form
//     const modal = document.querySelector('#modal-login');
//     M.Modal.getInstance(modal).close();
//     loginForm.reset();
//   });
// });