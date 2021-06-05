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
                const url = window.location.href;
                let currentProfile = url.substr(url.lastIndexOf("/") + 1);
                if (currentProfile != obj.data().username)
                {
                    console.log('this is not my profile!') 
                    document.getElementById('h1test').innerText = "This is not your profile."
                }
                else {
                    console.log('this is my profile! here is my data!');
                    console.log(obj.data());
                    document.getElementById('h1test').innerHTML = "This is your profile."
                }
            }
        })
    }
    else {
        console.log('no user logged in')
    }
})