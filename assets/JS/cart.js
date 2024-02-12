const allBookings = JSON.parse(localStorage.getItem("allBookings")) || []; // getting all booking from local storage
const email = localStorage.getItem("email");  // getting loggedIn users email

// getting logged in user's bookings from allbooking to show in cart
const userBooking = JSON.parse(localStorage.getItem('userbooking')) || []; 

//user login/logout
const isUserLoggedIn = localStorage.getItem("isLoggedIn");
const userLogInBtn = document.querySelector("#loginBtn");
if (isUserLoggedIn) userLogInBtn.textContent = "logout";

document.addEventListener("DOMContentLoaded", () => {
    if (!isUserLoggedIn) {
      alert('you have to login first');
      location.href = '../html/login.html'
    }
});

// logout user
userLogInBtn.addEventListener("click", () => {
  if (userLogInBtn.textContent === "logout") {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("email");
    localStorage.removeItem("userbooking");
    alert("User Logged out..");
    location.href = "../html/index.html";
  } 
  else if (userLogInBtn.textContent === "login") {
    location.href = "../html/login.html";
  }
});


//all booking details display
const bookedPackage = document.querySelector(".bookingReview");
userBooking.length === 0 ? bookedPackage.textContent = 'Add packages First to see here...' : displayPackages(userBooking);

function displayPackages(payload) {
  bookedPackage.innerHTML = payload.map((place,index) => `
    <div class="main-newPackage" id="package_${index}">
      <img src="../images/goa.jpg">
      <h2>${place.placeName}</h2>
      <h3>${place.placeCity}</h3>
      <h4>${place.placeCountry}</h4>
      <p>${place.placeDescription}</p>
      <p>${place.placeHighlights}</p>
      <h3>${place.packagePrice}</h3>
      <h4>${place.packageDays}</h4>
      <h4>${place.members}</h4>
      <h4>total = ${place.members * (place.packagePrice.split("/")[0] || place.packagePrice)}$</h4>
      <button class="deleteButton" >Delete Package</button>
      <button class="editPackageBtn" >Edit Package</button>
    </div>
  `).join('');
}



// ------------------------- delete package function

function deletePackage(event) {
  // selecting parent to access its children
  const targetPackage = event.target.parentNode;
  const targetPlace = targetPackage.children[1].textContent;
  const targetCity = targetPackage.children[2].textContent;
  const targetCountry = targetPackage.children[3].textContent;
  const targetId = targetPackage.id;
  document.getElementById(targetId).remove();

  //remove booking from userBooking array
  const index = userBooking.findIndex((dest) => {
    return (
      dest.placeCity === targetCity &&
      dest.placeName === targetPlace &&
      dest.placeCountry === targetCountry
    );
  });
  console.log(index);
  userBooking.splice(index, 1);
  localStorage.setItem("userbooking", JSON.stringify(userBooking));
  const emailIndex = allBookings.findIndex((dest) => {
    return dest.email === email;
  });

  allBookings[emailIndex].bookings.splice(index, 1);
  console.log(allBookings);
  localStorage.setItem("allBookings", JSON.stringify(allBookings));
}

//-------------------------------------edit/delete eventlistener with function call

document.body.addEventListener("click", function (e) {
  if (e.target.classList.contains("editPackageBtn")) {
    const confirmation = confirm("Are you sure to Edit it?");
    if (confirmation) {
      const updatedMembers = prompt("Enter the No. of Passengers: ");
      if (updatedMembers <= 0 || updatedMembers === null || isNaN(updatedMembers)) {
        alert('Enter valid number of members')
        updatedMembers = prompt("Enter the No. of Passengers: ");
      }
      editPackage(e, updatedMembers);
      return;
    }
  }
  if (e.target.classList.contains("deleteButton")) {
    const confirmation = confirm("Are you sure to delete it?");
    if (confirmation) {
      deletePackage(e);
      return;
    }
  }
});

//-----------------------------------------Edit button functionality
function editPackage(event, updatedMembers) {
  const targetPackage = event.target.parentNode;
  const targetMembers = targetPackage.children[7].textContent;
  const targetCity = targetPackage.children[2].textContent;
  const targetPlace = targetPackage.children[1].textContent;
  const targetCountry = targetPackage.children[3].textContent;
  const targetId = targetPackage.id;
  console.log(targetMembers);
  targetMembers.textContent = `No. of Passengers are: ${updatedMembers}`;

  const index = userBooking.findIndex((dest) => {
    return (
      dest.placeCity === targetCity &&
      dest.placeName === targetPlace &&
      dest.placeCountry === targetCountry
    );
  });
  console.log(userBooking[index].members);
  userBooking[index].members = updatedMembers;
  localStorage.setItem("userbooking", JSON.stringify(userBooking));
  bookedPackage.innerHTML = "";
  displayPackages(userBooking);
  ///edit booking from all booking array
  const emailIndex = allBookings.findIndex((dest) => {
    return dest.email === email;
  });
  allBookings[emailIndex].bookings[index].members = updatedMembers;
  console.log(allBookings);
  localStorage.setItem("allBookings", JSON.stringify(allBookings));
}

