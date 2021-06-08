// get all reviews for the current movie and display them
auth.onAuthStateChanged(user => {
    console.log('in movie.js')
    const url = window.location.href;
    let movieID = url.substr(url.lastIndexOf("/") + 1);
    console.log(movieID)
    const doc = db1.collection('reviews');
    const reviews = doc.where('movieID', '==', movieID);
    reviews.get()
    .then((snapshot) => {
        if (snapshot.empty) { console.log('there are no reviews for this movie') }
        else {
            const users = db1.collection('users');
            const div = document.getElementById('review-container');
            snapshot.forEach(doc => {
                const currentUser = users.doc(doc.data().userID);
                currentUser.get()
                .then((user) => {
                    if (!user.exists) { }
                    else {
                        const html = `
                            <p1>User: ${user.data().username}</p1>
                            <p1>Rating: ${doc.data().rating}/10</p1>
                            <p1>Review: ${doc.data().review}</p1>
                        `;
                        div.innerHTML += html;
                    }
                })
            })
        }
    })
    .catch((e) => {
        console.log("error: " + e);
    })
})

function addReview() {
    const url = window.location.href;
    let movieID = url.substr(url.lastIndexOf("/") + 1);
    const doc = db1.collection('reviews');
    const reviews = doc.where('movieID', '==', movieID);
    reviews.get()
    .then((snapshot) => {
        if (snapshot.empty) { console.log('there are no reviews for this movie') }
        else {
            const data = {
                userID: "N5DN2a0C7Zh4TFOuXkzdxTbucuz2",
                movieID: "tt0047034",
                rating: 2,
                review: "Wow, this movie is really bad"
            }
            let reviewAlreadyExists = false;
            snapshot.forEach(doc => {
                if (doc.data().userID == data.userID)
                {
                    console.log('error: this user already made a review for this movie')
                    reviewAlreadyExists = true;
                }                
            })
            if (!reviewAlreadyExists)
            {
                db1.collection('reviews').add(data)
                .then((res) => {
                    console.log('added review with id: ' + res.id)
                })
                .catch((e) => {
                    console.log('error adding doc: ' + e);
                })
            }
            else { console.log('review alr exists') }
        }
    })
    .catch((e) => {
        console.log("error: " + e);
    })    

}


