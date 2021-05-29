// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyDL4ouOGbXMw48nVdPp8Of-_Qzbg20zrS4",
  authDomain: "cinemacenter-8ff56.firebaseapp.com",
  databaseURL: "https://cinemacenter-8ff56-default-rtdb.firebaseio.com",
  projectId: "cinemacenter-8ff56",
  storageBucket: "cinemacenter-8ff56.appspot.com",
  messagingSenderId: "119313892179",
  appId: "1:119313892179:web:5c39f74d27fd0c7a8357a6",
  measurementId: "G-E1MT3KJDEV"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

document.getElementById('user-reg-button').addEventListener('click', signUpUser)

function signUpUser(){
    console.log('Calling');
  //let username = document.getElementById('username').value
  let email = document.getElementById('user-reg-email').value
  let password = document.getElementById('user-reg-password').value
  //let confirmPassword = document.getElementById('confirmPassword').value
  //let firstName = document.getElementById('firstName').value
  //let lastName = document.getElementById('lastName').value

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(e=> {
  console.log(e)
  })
}

firebase.auth().onAuthStateChanged(user=> {
  if(user){
    console.log(user)
  }else {

  }
})
