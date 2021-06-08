console.log('in profilejs')

// determine if the current user is visiting their own profile
auth.onAuthStateChanged(user => {
    if (user) {
        const doc = db1.collection('users').doc(user.uid);
        doc.get().then((obj) => {
            if (!obj.exists) {
                console.log('no doc exists') 
            }
            else {
                document.getElementById("firstName").innerHTML = obj.data().firstName;
                document.getElementById("lastName").innerHTML = obj.data().lastName;
                document.getElementById("location").innerHTML = obj.data().location;
                document.getElementById("favoriteGenre").innerHTML = obj.data().favoriteGenre;
                document.getElementById("biography").innerHTML = obj.data().biography;
            }
        })
    }
    else {
        console.log('no user logged in')
    }

    // const doc = db1.collection('users').doc(user.uid);
    // doc.get().then((obj) => {
    //     console.log(obj.data());
    // })

    const email = "johndoe@email.com"
    const password = "test123"
    const username = "johndoe"
    const firstName = "John"
    const lastName = "Doe"
    const biography = "This is a sample biography."
    const location = "United States"
    const favoriteGenre = "Action"

    // auth.createUserWithEmailAndPassword(email, password).then(cred => {
    //     return db1.collection('users').doc(cred.user.uid).set({
    //         username: username,
    //         firstName: firstName,
    //         lastName: lastName,
    //         biography: biography,
    //         location: location,
    //         favoriteGenre: favoriteGenre,
    //     });
    //   }).then(() => {
    //     // // close the signup modal & reset form
    //     // const modal = document.querySelector('#modal-signup');
    //     // M.Modal.getInstance(modal).close();
    //     // signupForm.reset();
    //     alert('successfully added user with username: ' + username);
    //   });

})