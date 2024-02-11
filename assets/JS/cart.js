const allBookings = JSON.parse(localStorage.getItem("allBookings")) || [];
const email = localStorage.getItem("email");

const userBooking = JSON.parse(localStorage.getItem("userbooking")) || [];

//admin login/logout
const isUserLoggedIn = localStorage.getItem("isLoggedIn");
const userLogInBtn = document.querySelector("#loginBtn");

if (isUserLoggedIn) {
  userLogInBtn.textContent = "logout";
}
// logout admin
userLogInBtn.addEventListener("click", () => {
  if (userLogInBtn.textContent === "logout") {
    localStorage.removeItem("isLoggedIn");
    alert("User Logged out..");
    location.href = "../html/index.html";
  } else if (userLogInBtn.textContent === "login") {
    location.href = "../html/login.html";
  }
});

//all booking details display
const bookedPackage = document.querySelector(".bookingReview");

displayPackages(userBooking);
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
      <h3>No. of Passengers: ${place.members}</h3>
      <h4>${place.packageDays}</h4>
      <h4>total = ${place.members * (place.packagePrice.split("/")[0] || place.packagePrice)}$</h4>
      <button class="deleteButton" >Delete Package</button>
      <button class="editPackageBtn" >Edit Package</button>
    </div>
  `).join('');
}

// function displayPackages(payload) {
//   let i = 1;
//   for (let place of payload) {
//     const newPackage = document.createElement("div");
//     newPackage.className = "main-newPackage";
//     newPackage.id = `package`;

//     const newPackageImg = document.createElement("img");
//     newPackageImg.src = "../images/goa.jpg";
//     newPackage.append(newPackageImg);
//     newPackage.className = "main-newPackage";
//     newPackage.id = `package_${i}`;
//     newPackage.append(newPackageImg);

//     const placeName = document.createElement("h2");
//     placeName.textContent = place.placeName;
//     newPackage.append(placeName);

//     const placeCity = document.createElement("h3");
//     placeCity.textContent = place.placeCity;
//     newPackage.append(placeCity);

//     const placeCountry = document.createElement("h4");
//     placeCountry.textContent = place.placeCountry;
//     newPackage.append(placeCountry);
//     placeCountry.textContent = place.placeCountry;
//     newPackage.append(placeCountry);

//     const desc = document.createElement("p");
//     desc.textContent = place.placeDescription;
//     newPackage.append(desc);

//     const highlights = document.createElement("p");
//     highlights.textContent = `${place.placeHighlights}`;
//     newPackage.append(highlights);

//     const price = document.createElement("h3");
//     price.textContent = place.packagePrice;
//     newPackage.append(price);

//     const members = document.createElement("h3");
//     members.textContent = `No. of Passengers: ${place.members}`;
//     newPackage.append(members);

//     const duration = document.createElement("h4");
//     duration.textContent = place.packageDays;
//     newPackage.append(duration);

//     const cost = document.createElement("h4");
//     const onePackPrice = place.packagePrice.split("/")[0] || place.packagePrice;
//     const totalCost = place.members * onePackPrice;
//     cost.textContent = `${totalCost}$`;
//     newPackage.append(cost);

//     const deleteBooking = document.createElement("button");
//     deleteBooking.textContent = "Delete Package";
//     deleteBooking.id = `deletePackageBtn`;
//     deleteBooking.className = "deleteButton";
//     newPackage.append(deleteBooking);

//     const editBooking = document.createElement("button");
//     editBooking.textContent = "Edit Package";
//     editBooking.className = "editPackageBtn";
//     newPackage.append(editBooking);

//     bookedPackage.appendChild(newPackage);
//     i++;
//   }
// }

///                        delete button functionality

//var buttons = document.querySelectorAll('.deleteButton');

// buttons.forEach(function(button) {
//     button.addEventListener('click', function(event) {
//       alert("Are you sure to delete it?")

//         deletePackage(event);

//     });
// });

function deletePackage(event) {
  const targetPackage = event.target.parentNode;
  console.log(targetPackage);
  const targetCity = targetPackage.children[2].textContent;
  const targetPlace = targetPackage.children[1].textContent;
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

  // const filteredPackages = userBooking.filter((dest) => {
  //   console.log(dest.placeCity);
  //   console.log(dest.placeName);
  //   console.log(dest.placeCountry);
  //   return dest.placeCity !== targetCity && dest.placeName !== targetPlace && dest.placeCountry !== targetCountry

  // });

  localStorage.setItem("userbooking", JSON.stringify(userBooking));

  //remove booking from allbooking array

  const emailIndex = allBookings.findIndex((dest) => {
    return dest.email === email;
  });

  allBookings[emailIndex].bookings.splice(index, 1);
  console.log(allBookings);
  localStorage.setItem("allBookings", JSON.stringify(allBookings));
}

/////                    edit/delete eventlistener with function call

document.body.addEventListener("click", function (e) {
  if (e.target.classList.contains("editPackageBtn")) {
    const confirmation = confirm("Are you sure to Edit it?");
    if (confirmation) {
      const updatedMembers = prompt("Enter the No. of Passengers: ");
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

// const editButtons = document.querySelectorAll('.editPackageBtn');

// console.log(editButtons);
// editButtons.forEach(function(button) {
//     button.addEventListener('click', function(event) {
//       const confirmation = confirm("Are you sure to Edit it?")
//       if(confirmation){
//         const updatedMembers = prompt("Enter the No. of Passengers: ")

//         editPackage(event,updatedMembers);
//         return;
//       }

//     });
// });


//////            Edit button functionality

function editPackage(event, updatedMembers) {
  const targetPackage = event.target.parentNode;

  const targetMembers = targetPackage.children[7].textContent;
  const targetCity = targetPackage.children[2].textContent;
  const targetPlace = targetPackage.children[1].textContent;
  const targetCountry = targetPackage.children[3].textContent;
  const targetId = targetPackage.id;
  console.log(targetMembers);
  targetMembers.textContent = `No. of Passengers are: ${updatedMembers}`;
  // const membersValue = targetMembers.split(" ");
  // const lengtht = membersValue.length;
  // const membersAre = membersValue[lengtht-1];

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

// we are adding buttons dynamically so if new buttons are added to the page then they don't have event listner so we have to delegate event
// from body to that button..
// document.body.addEventListener("click", function (e) {
//   if (e.target.classList.contains("bookingBtn")) {
//     handleBooking(e);
//   }
// });

// function displayPackages(payload) {
//   packages.innerHTML = payload
//     .map((place) => {
//       const {
//         placeName,
//         placeCity,
//         placeCountry,
//         placeDescription,
//         placeHighlights,
//         packagePrice,
//         packageDays,
//       } = place;

//       return `
//       <div class="main-newPackage" id="package">
//         <img src="../images/goa.jpg" />
//         <h2>${placeName}</h2>
//         <h3>${placeCity}</h3>
//         <h4>${placeCountry}</h4>
//         <p>${placeDescription}</p>
//         <p>${placeHighlights}</p>
//         <h3>${packagePrice}/person</h3>
//         <h4>${packageDays} days</h4>
//         <button class="bookingBtn">Book Now</button>
//       </div>
//     `;
//     })
//     .join("");
// }
