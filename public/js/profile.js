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
})