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
                      <div class="blog-card">
                      <div class="meta"></div>
                      <div class="description">
                        <h1>Great Product!!</h1>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                        <br>
                        <h2>${user.data().username}</h2>
                        <p>${doc.data().review}()</p>
                        ${console.log(doc.data().review)}
                      </div>
                    </div>
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
      if (auth.currentUser != null)
      {
          const user = db1.collection('users').doc(auth.currentUser.uid);
          user.get()
          .then(() => {
              const data = {
                  userID: auth.currentUser.uid,
                  movieID: movieID,
                  rating: "temp",
                  review: document.getElementById('reviewComments').value,
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
  console.log(reviewName);
  console.log(reviewComments);

 // reviewComments.preventDefault();
  addReview();
  closeModal();

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
    // star1.checked = true;
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


