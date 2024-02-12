const allBookings = JSON.parse(localStorage.getItem("allBookings")) || [];
const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn");

document.addEventListener("DOMContentLoaded", () => {
  if (!isAdminLoggedIn) {
    alert('you must login first');
    location.href = '../html/login.html'
  }
});

// function to display all booking to the admin

const userAllBookings = document.querySelector(".allBooking");
viewAllBookings(allBookings);
function viewAllBookings(allBookings) {
  let cnt = 1;

  allBookings.forEach((user) => {
    const oneUsersBooking = document.createElement("div");
    oneUsersBooking.id = `module_${cnt}`;

    const userEmail = document.createElement("h4");
    userEmail.textContent = `User Email : ${user.email} `;
    oneUsersBooking.append(userEmail);

    const Email = document.createElement("h5");
    Email.className = "emailId";
    Email.innerText = user.email;
    oneUsersBooking.append(Email);

    const packageHTML = user.bookings.map((place, index) => `
      <div class="main-newPackage" id="package_${index}">
        <img src="../images/goa.jpg">
        <h3>${place.placeCity}</h3>
        <h2>${place.placeName}</h2>
        <h4>${place.placeCountry}</h4>
        <p>${place.placeDescription}</p>
        <p>${place.placeHighlights}</p>
        <h3>${place.packagePrice}</h3>
        <h4>${place.packageDays}</h4>
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
  if (e.target.classList.contains('editPackageBtn')) {
     // for edit here
  }
});

function deletePackage(event) {
  const targetPackage = event.target.parentNode;
  const targetCity = targetPackage.children[1].textContent;
  const targetPlace = targetPackage.children[2].textContent;
  const targetCountry = targetPackage.children[3].textContent;
  const targetId = targetPackage.id;

  const emailValue = targetPackage.parentNode.children[1].textContent;
  document.getElementById(targetId).remove();

  // finding booking index of user with specific email
  const emailIndex = allBookings.findIndex((dest) => {
    return dest.email === emailValue;
  });
  
  // from that user getting index of targeted booking
  const index = allBookings[emailIndex].bookings.findIndex((dest) => {
    return (
      dest.placeCity === targetPlace && dest.placeName === targetCity && dest.placeCountry === targetCountry);
  });
 
  // deleting targeted package selected by admin
  allBookings[emailIndex].bookings.splice(index, 1);
  localStorage.setItem("allBookings", JSON.stringify(allBookings));
  userAllBookings.innerHTML = '';
  viewAllBookings(allBookings);
}