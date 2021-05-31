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


 document.getElementById('loginBtn').addEventListener('click', LoginUser)
    document.getElementById('logoutBtn').addEventListener('click', LogoutUser)

    document.getElementById('loginScreen').style.display = "block"
    document.getElementById('dashboard').style.display = "none"

    function LoginUser(){
        let email = document.getElementById('email').value
        let password = document.getElementById('password').value

        firebase.auth().signInWithEmailAndPassword(email, password).catch(e=> {
            if (document.getElementById("errorMessage") == null)
            {
                let p = document.createElement("p");
                p.innerHTML = "Error: " + e.message;
                p.id = "errorMessage";
                document.getElementById('loginScreen').appendChild(p);   
            }
            else
            {
                document.getElementById('errorMessage').innerHTML = "Error: " + e.message;
            }
            console.log(e)
        })
    }

    function LogoutUser(){
        firebase.auth().signOut().then(()=> {
            document.getElementById('loginScreen').style.display = "block"
            document.getElementById('dashboard').style.display = "none"
        }).catch(e=>{
            console.log(e)
        })
    }


    function showUserDetails(user){
        document.getElementById('userDetails').innerHTML = `
        <p>Logged in Success with ${user.email}</p>
        `
    }

    firebase.auth().onAuthStateChanged(user=> {
        if(user){
            console.log(user)
            document.getElementById('loginScreen').style.display = "none"
            document.getElementById('dashboard').style.display = "block"
            showUserDetails(user)
        }else {
            document.getElementById('loginScreen').style.display = "block"
            document.getElementById('dashboard').style.display = "none"
        } 
    })
