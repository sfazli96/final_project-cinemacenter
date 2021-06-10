var loggedInUID;
var loggedInUserDoc;

// get all reviews for the current movie and display them
auth.onAuthStateChanged(user => {
  if (user) {
    loggedInUID = user.uid;
    loggedInUserDoc = db1.collection('users').doc(loggedInUID);
    const url = window.location.href;
    let movieID = url.substr(url.lastIndexOf("/") + 1);
    const doc = db1.collection('reviews');
    const reviews = doc.where('movieID', '==', movieID);
    reviews.get().then((reviews) => {
      let userAlreadyMadeReview = false;
      reviews.forEach(doc => {
        if (doc.data().userID == user.uid) {
          userAlreadyMadeReview = true;
        }
      })      
      if (!userAlreadyMadeReview) {
        console.log('user has not made a review')
        document.getElementsByTagName('h2')[0].style = "display: inline-block;"
        document.getElementById('review-add-btn').style = "display: inline-block; "
        db1.collection('users').doc(user.uid).get().then((obj) => {
          document.getElementById('reviewName').value = obj.data().username;
        })
      }
      else {
        console.log('user already made a review')
        document.getElementsByTagName('h2')[0].style = "display: none;"
        document.getElementById('review-add-btn').style = "display: none; "          
      }
    })
  }
  else {
    document.getElementsByTagName('h2')[0].style = "display: none;"
    document.getElementById('review-add-btn').style = "display: none; "

    let h7 = document.createElement('h7');
    h7.innerText = ('Please log in to review this movie')
    document.getElementsByClassName('review_section')[0].prepend(h7);
  }
  console.log('in movie.js')
  const url = window.location.href;
  let movieID = url.substr(url.lastIndexOf("/") + 1);
  console.log(movieID)
  const doc = db1.collection('reviews');
  const reviews = doc.where('movieID', '==', movieID);
  reviews.get()
  .then((snapshot) => {
      if (snapshot.empty) {
        console.log('there are no reviews for this movie') 
        let new_h1 = document.createElement('h1');
        new_h1.id = "no-reviews-h1"
        new_h1.innerHTML = "There are no reviews for this movie!"
        new_h1.style = "color: white; text-align: center; margin-top: 2%"
        document.getElementsByClassName('review_section')[0].appendChild(new_h1);
      }
      else {
          const users = db1.collection('users');
          const div = document.getElementById('review-container');
          snapshot.forEach(doc => {
              const currentUserDoc = users.doc(doc.data().userID);
              currentUserDoc.get()
              .then((currentUser) => {
                  if (!currentUser.exists) { }
                  else {
                      // console.log(doc.data().likes);
                      const html = `
                      <div class="blog-card">
                      <div class="meta"></div>
                      <div class="description">
                        <br>
                        <a class="reviewProfile" href="/profile/${currentUser.data().username}">${currentUser.data().username}</a>
                        <p>${doc.data().review}</p>              
                        <button class="btn" id="green"><i class="fa fa-thumbs-up fa-lg" aria-hidden="true"></i></button>
                        <button class="btn" id="red"><i class="fa fa-thumbs-down fa-lg" aria-hidden="true"></i></button>
                      
                      </div>
                      <p1 class="likes" style="color: black">Likes: ${doc.data().likes}</p1>                      
                    </div>
                      `;
                      div.innerHTML += html;
                      let descriptions = document.getElementsByClassName('description')
                      let currentReview = descriptions[descriptions.length - 1]
                      let temp = 0;
                      while (temp < doc.data().rating)
                      {
                        let star = document.createElement('span')
                        star.className = "fa fa-star checked";                        
                        currentReview.insertBefore(star, currentReview.firstChild);
                        ++temp;
                      }
                      // if review is already liked by the currently logged in user, check the box
                      let likeButton = document.getElementsByClassName('likeButton')[document.getElementsByClassName('likeButton').length-1]
                      loggedInUserDoc.get().then((obj) => {
                        let alreadyLikedReview = false;
                        for (let i = 0; i < obj.data().likedReviews.length; ++i) {
                          if (obj.data().likedReviews[i] == doc.id)
                          {
                            console.log('user liked this review from ' + doc.data().username)
                            alreadyLikedReview = true;
                          }
                        }
                        if (alreadyLikedReview) { likeButton.checked = true; }
                        else { likeButton.checked = false; }
                      }) 
                  }
              })
          })
          let temp = document.getElementsByClassName('likeButton');
          console.log(temp)
          for (let i = 0; i < temp.length; ++i)
            console.log(temp[i].checked)
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
      if (auth.currentUser != null)
      {
          const user = db1.collection('users').doc(auth.currentUser.uid);
          user.get()
          .then((obj) => {
              let rating = 1;
              if (document.getElementById('star1').checked) { rating = 1; }
              else if (document.getElementById('star2').checked) { rating = 2; }
              else if (document.getElementById('star3').checked) { rating = 3; }
              else if (document.getElementById('star4').checked) { rating = 4; }
              else if (document.getElementById('star5').checked) { rating = 5; }
              else { rating = 1; }

              const data = {
                  userID: auth.currentUser.uid,
                  username: obj.data().username,
                  movieID: movieID,
                  rating: rating,
                  review: document.getElementById('reviewComments').value,
                  likes: 0,
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
                    console.log(data)
                })
                .catch((e) => {
                    console.log('error adding doc: ' + e);
                })
                .then(() => {location.reload();})
              }
              else { console.log('review already exists') }
          })
      }
      else
      {
          console.log("error: cannot add review because no user is logged in")
      }
  })
  .catch((e) => {
      console.log("error: " + e);
  })
}


//Reviews

let focusedElementBeforeModal;
var modal = document.getElementById('modal');
var modalOverlay = document.querySelector('.modal-overlay');

window.onload = () => {
  var addReview = document.getElementById('review-add-btn');
  addReview.id = 'review-add-btn';
  addReview.innerHTML = '+';
  addReview.setAttribute('aria-label', 'add review');
  addReview.title = 'Add Review';
  addReview.addEventListener('click', openModal);
 // addReview.click();
} 

var openModal = () => {
  // Save current focus
  focusedElementBeforeModal = document.activeElement;

  // Listen for and trap the keyboard
  modal.addEventListener('keydown', trapTabKey);

  // Listen for indicators to close the modal
  modalOverlay.addEventListener('click', closeModal);

  // Close btn
  var closeBtn = document.querySelector('.close-btn');
  closeBtn.addEventListener('click', closeModal);

  // submit form
  var form = document.getElementById('review-form');
  form.addEventListener('submit', submitAddReview, true);

  // Find all focusable children
  var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
  var focusableElements = modal.querySelectorAll(focusableElementsString);
  // Convert NodeList to Array
  focusableElements = Array.prototype.slice.call(focusableElements);

  var firstTabStop = focusableElements[0];
  var lastTabStop = focusableElements[focusableElements.length - 1];

  // Show the modal and overlay
  modal.classList.add('show');
  modalOverlay.classList.add('show');

  // let loggedInUserDoc = db1.collection('users').doc(user.uid);
  // loggedInUserDoc.get().then((obj) => {
  //   document.getElementById('reviewName').innerText = obj.data().username;
  // })

  // Focus first child
  // firstTabStop.focus();
  var reviewName = document.getElementById('reviewName');
  reviewName.focus();

  function trapTabKey(e) {
    // Check for TAB key press
    if (e.keyCode === 9) {

      // SHIFT + TAB
      if (e.shiftKey) {
        if (document.activeElement === firstTabStop) {
          e.preventDefault();
          lastTabStop.focus();
        }

      // TAB
      } else {
        if (document.activeElement === lastTabStop) {
          e.preventDefault();
          firstTabStop.focus();
        }
      }
    }

    // ESCAPE
    if (e.keyCode === 27) {
      closeModal();
    }
  }
};

function submitAddReview (reviewComments, reviewName) {
  // console.log(e);
  console.log('Form submitted!');
  //reviewComments = document.getElementById("reviewComments").innerHTML;
  // console.log(reviewName);
  // console.log(reviewComments);

 // reviewComments.preventDefault();
  addReview();
};

var closeModal = () => {
  // Hide the modal and overlay
  modal.classList.remove('show');
  modalOverlay.classList.remove('show');

  var form = document.getElementById('review-form');
  form.reset();
  // Set focus back to element that had it before the modal was opened
  focusedElementBeforeModal.focus();
};

var setFocus = (evt) => {
  var rateRadios = document.getElementsByName('rate');
  var rateRadiosArr = Array.from(rateRadios);
  var anyChecked = rateRadiosArr.some(radio => { return radio.checked === true; });
  // console.log('anyChecked', anyChecked);
  if (!anyChecked) {
    var star1 = document.getElementById('star1');
    star1.focus();
  }
};

var navRadioGroup = (evt) => {

  var star1 = document.getElementById('star1');  
  var star2 = document.getElementById('star2');  
  var star3 = document.getElementById('star3');  
  var star4 = document.getElementById('star4');  
  var star5 = document.getElementById('star5');  

  if (['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'].includes(evt.key)) {
    evt.preventDefault();
    // console.log('attempting return');
    if (evt.key === 'ArrowRight' || evt.key === 'ArrowDown') {
      switch(evt.target.id) {
        case 'star1':
          star2.focus();
          star2.checked = true;
          break;
        case 'star2':
          star3.focus();
          star3.checked = true;
          break;
        case 'star3':
          star4.focus();
          star4.checked = true;
          break;
        case 'star4':
          star5.focus();
          star5.checked = true;
          break;
        case 'star5':
          star1.focus();
          star1.checked = true;
          break;
      }
    } else if (evt.key === 'ArrowLeft' || evt.key === 'ArrowUp') {
      switch(evt.target.id) {
        case 'star1':
          star5.focus();
          star5.checked = true;
          break;
        case 'star2':
          star1.focus();
          star1.checked = true;
          break;
        case 'star3':
          star2.focus();
          star2.checked = true;
          break;
        case 'star4':
          star3.focus();
          star3.checked = true;
          break;
        case 'star5':
          star4.focus();
          star4.checked = true;
          break;
      }
    }
  }

};

function toggleLike(checkbox) {

  const url1 = checkbox.parentElement.parentElement.querySelector('a').href;
  const username = url1.substr(url1.lastIndexOf("/") + 1);
  const reviewsDoc = db1.collection('reviews');
  const url2 = window.location.href;
  let movieID = url2.substr(url2.lastIndexOf("/") + 1);
  const reviews = reviewsDoc.where('movieID', '==', movieID);
  reviews.get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.data().username == username) {
          if (checkbox.checked) {
            reviewsDoc.doc(doc.id).update({likes: doc.data().likes + 1})
            console.log('liked this review from: ' + doc.data().username)
            const userDoc = db1.collection('users').doc(loggedInUID)
            userDoc.get().then((obj) => {
              console.log(obj.data().likedReviews);
            })
            userDoc.update({likedReviews: firebase.firestore.FieldValue.arrayUnion(doc.id)})
            console.log('updated likedReviews for ' + loggedInUID)
          }
          else { 
            reviewsDoc.doc(doc.id).update({likes: doc.data().likes - 1})
            console.log('unliked this review from: ' + doc.data().username)
            const userDoc = db1.collection('users').doc(loggedInUID)
            userDoc.get().then((obj) => {
              console.log(obj.data().likedReviews);
            })
            userDoc.update({likedReviews: firebase.firestore.FieldValue.arrayRemove(doc.id)})            
          }
        }
      })
    })
    .then(console.log('something happened'))

//   const doc = db1.collection('reviews');
//   const reviews = doc.where('movieID', '==', movieID);
//   reviews.get()
//   .then((snapshot) => {

    

//   })  
}
var btn1 = document.querySelector('#green');
var btn2 = document.querySelector('#red');

btn1.addEventListener('click', function() {
  
    if (btn2.classList.contains('red')) {
      btn2.classList.remove('red');
    } 
  this.classList.toggle('green');
  
});

btn2.addEventListener('click', function() {
  
    if (btn1.classList.contains('green')) {
      btn1.classList.remove('green');
    } 
  this.classList.toggle('red');
  
});
