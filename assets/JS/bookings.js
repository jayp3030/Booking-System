const allBookings = JSON.parse(localStorage.getItem("allBookings")) || [];  // getting allbooking from localstorage
const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn");   

document.addEventListener("DOMContentLoaded", () => {
  if (!isAdminLoggedIn) {
    alert("you must login first");
    location.href = "../html/login.html";
  }
});

if (isAdminLoggedIn) {
  adminLoginBtn.textContent = "logout";
}

// logout admin
adminLoginBtn.addEventListener("click", () => {
  if (adminLoginBtn.textContent === "logout") {
    localStorage.removeItem("isAdminLoggedIn");
    alert("Admin Logged out..");
    location.href = "../html/index.html";
  }
});

// function to display all booking to the admin
const userAllBookings = document.querySelector(".allBooking");
viewAllBookings(allBookings);

function viewAllBookings(allBookings) {
  let cnt = 1;
  allBookings.forEach((user) => {

    const oneUsersBooking = document.createElement("div");
    oneUsersBooking.className = 'mainUserWrapper';
    oneUsersBooking.id = `module_${cnt}`;

    if(user.bookings.length !== 0){
      const userEmail = document.createElement("h2");
      userEmail.style.textAlign = 'center';
      userEmail.textContent = `User Email : ${user.email} `;
      oneUsersBooking.append(userEmail);
    }

    const packageHTML = user.bookings.map((place, index) => `
      <div class="main-newPackage" id="package_${index}">
        <img src="../images/goa.jpg">
        <h2 class="place">${place.placeName}</h2>
        <h3 class="city">${place.placeCity}</h3>
        <h4 class="country">${place.placeCountry}</h4>
        <p class="desc">${place.placeDescription}</p>
        <p class="highlights">${place.placeHighlights}</p>
        <h3 class="price">$${place.packagePrice}/person</h3>
        <h3 class="members">${place.members} members</h3>
        <h3 class="cost">Total: $${+place.packagePrice.split('/')[0]*+place.members}</h3>
        <h4 class="duration">${place.packageDays}</h4>
        <button class="deleteButton" id="deletePackageBtn">Delete Package</button>
      </div>
    `).join('');

    oneUsersBooking.innerHTML += packageHTML;

    userAllBookings.appendChild(oneUsersBooking);
    cnt++;
  });
}


document.body.addEventListener("click", function (e) {
  if (e.target.classList.contains("deleteButton")) {
    const confirmation = confirm('are you sure ?');
    if (confirmation) deletePackage(e);
    return;
  }
});

// function to delete package 
function deletePackage(event) {
  // selecting targeted booking card
  const targetPackage = event.target.parentNode;
  const targetCity = targetPackage.children[2].textContent;
  const targetPlace = targetPackage.children[1].textContent;
  const targetCountry = targetPackage.children[3].textContent;
  const targetId = targetPackage.id;

  const emailValueArr = targetPackage.parentNode.children[0].textContent.split(':');
  const emailValue = emailValueArr[emailValueArr.length - 1]

  document.getElementById(targetId).remove();
  // finding booking index of user with specific email
  const emailIndex = allBookings.findIndex((user) => {
    return user.email === emailValue.trim();
  });

  // from that user getting index of targeted booking
  const index = allBookings[emailIndex].bookings.findIndex((dest) => {
    return (
      dest.placeCity === targetPlace && dest.placeName === targetCity && dest.placeCountry === targetCountry);
  });
 
  // deleting targeted booking package selected by admin and updating local storage
  allBookings[emailIndex].bookings.splice(index, 1);
  localStorage.setItem("allBookings", JSON.stringify(allBookings));
  userAllBookings.innerHTML = '';
  viewAllBookings(allBookings);
}