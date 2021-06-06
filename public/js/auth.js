// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    const doc = db1.collection('users').doc(user.uid);
    doc.get().then((obj) => {
      if (!obj.exists) { console.log('no doc exists') }
      else {
        console.log(obj.data());
      }
    })
  }
  else {
    console.log('no user logged in')
  }
})

// signup
if (document.getElementById('user-reg-button'))
{
  const signupForm = document.getElementById('user-reg-button')
  signupForm.addEventListener('click', (e) => {
    e.preventDefault();
    
    // get user info
    const username = document.getElementById('user-reg-username').value
    const email = document.getElementById('user-reg-email').value
    const password = document.getElementById('user-reg-password').value
    const fullName = document.getElementById('user-reg-first-name').value // fix later
    
    console.log(username)
    console.log(email)
    console.log(password)
    console.log(fullName)


    // sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
      return db1.collection('users').doc(cred.user.uid).set({
          username: username,
          fullName: fullName
      });
    }).then(() => {
      // // close the signup modal & reset form
      // const modal = document.querySelector('#modal-signup');
      // M.Modal.getInstance(modal).close();
      // signupForm.reset();
      console.log('successfully added user with username: ' + username);
    });
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