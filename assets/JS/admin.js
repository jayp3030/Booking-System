const placesDiv = document.querySelector("#places");
const places = JSON.parse(localStorage.getItem("places")) || [];
const existedUsers = JSON.parse(localStorage.getItem("registeredUser")) || [];
const allBookings = JSON.parse(localStorage.getItem("allBookings"));

const adminPagePackages = document.querySelector(".adminPagePackages");
const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn");
const adminLoginBtn = document.querySelector("#adminLoginBtn");

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

// functions to display pacages added by admin
adminPageDisplay(places);
function adminPageDisplay(payload) {
  adminPagePackages.innerHTML = payload.map((place, index) => `
    <div class="main-newPackage" id="package_${index}">
        <img src="../images/goa.jpg">
        <h2 class="place">${place.placeName}</h2>
        <h3 class="city">${place.placeCity}</h3>
        <h4 class="country">${place.placeCountry}</h4>
        <p class="desc">${place.placeDescription}</p>
        <p class="highlights">${place.placeHighlights}</p>
        <h3 class="price">${place.packagePrice}/person</h3>
        <h4 class="duration">${place.packageDays} days</h4>
        <button class="deleteButton">Delete Package</button>
        <button class="editPackageBtn">Edit Package</button>
    </div>
`).join('');
}

// selecting form button
const adminFormBtn = document.querySelector("#adminFormBtn");
// selecting form
const packageForm = document.querySelector("#addPackageForm");
packageForm.addEventListener("submit", (e) => {
  if (adminFormBtn.textContent.toLowerCase() === "add package") {
    addPackage(e);
    clearForm();
    return;
  }
});

// function to add package
function addPackage(e) {
  e.preventDefault();

  // validating that admin is loggedIn or not
  if (!isAdminLoggedIn) {
    alert("LogIn first to create an package");
    return;
  }

  // getting all input value from form
  const placeName = document.querySelector("#placeName").value;
  const placeCity = document.querySelector("#placeCity").value;
  const placeCountry = document.querySelector("#placeCountry").value;
  const placeHighlights = document.querySelector("#placeHighlights").value;
  const placeDescription = document.querySelector("#placeDescription").value;
  const packagePrice = document.querySelector("#packagePrice").value;
  const packageDays = document.querySelector("#packageDays").value;

  // converting string of highlights to array
  const placeHighlightsArr = placeHighlights.toLowerCase().split(",");

  // validating user inputs
  if (
    !placeName ||
    !placeCity ||
    !placeCountry ||
    !placeHighlights ||
    !placeDescription ||
    !packagePrice ||
    !packageDays
  ) {
    alert("Enter all details");
    return;
  }

  // creating object of package
  const package = {
    placeName: placeName,
    placeCity: placeCity,
    placeCountry: placeCountry,
    placeHighlights: placeHighlightsArr,
    placeDescription: placeDescription,
    packagePrice: packagePrice,
    packageDays: packageDays,
  };

  // adding package to the places array and storing it in localstorage
  places.push(package);
  localStorage.setItem("places", JSON.stringify(places));
  alert("Package added Successfully !");

  // updating card display
  adminPagePackages.innerHTML = "";
  adminPageDisplay(places);
}

// function to clear form
function clearForm() {
  document.querySelector("#placeName").value = "";
  document.querySelector("#placeCity").value = "";
  document.querySelector("#placeCountry").value = "";
  document.querySelector("#placeHighlights").value = "";
  document.querySelector("#placeDescription").value = "";
  document.querySelector("#packagePrice").value = "";
  document.querySelector("#packageDays").value = "";
}

// listening click event on delete package and edit package
document.body.addEventListener("click", function (e) {
  if (e.target.classList.contains("deleteButton")) {
    const confirmation = confirm("are you sure ?");
    if (confirmation) deletePackage(e);
    return;
  }
  if (e.target.classList.contains("editPackageBtn")) {
    const confirmation = confirm("are you sure ?");
    if (confirmation) setForm(e);
    return;
  }
});

// function to delete package
function deletePackage(event) {
  // getting targeted card
  const targetPackage = event.target.parentNode;
  const targetCity = targetPackage.children[2].textContent;
  const targetPlace = targetPackage.children[1].textContent;
  const targetCountry = targetPackage.children[3].textContent;
  const targetId = targetPackage.id;

  // removing targeted package card
  document.getElementById(targetId).remove();

  // finding index of deleted package
  const index = places.findIndex((dest) => {
    return (
      dest.placeCity === targetCity &&
      dest.placeName === targetPlace &&
      dest.placeCountry === targetCountry
    );
  });

  // deleting it from original array
  places.splice(index, 1);
  // updating in local storage
  localStorage.setItem("places", JSON.stringify(places));
}

const targetedCardObj = {};
// function for setting form inputs while editing
function setForm(event) {
  event.preventDefault();
  // scrolling to top
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

  // selecting the contents of targeted package card
  const targetPackage = event.target.parentNode;
  const targetCity = targetPackage.children[2].textContent;
  const targetPlace = targetPackage.children[1].textContent;
  const targetCountry = targetPackage.children[3].textContent;
  const targetHighL = targetPackage.children[4].textContent;
  const targetDesc = targetPackage.children[5].textContent;
  const targetPrice = targetPackage.children[6].textContent.split("/")[0];
  const targetDays = targetPackage.children[7].textContent.split(' ')[0];

  targetedCardObj.targetPlace = targetPlace;
  targetedCardObj.targetCity = targetCity;

  // setting selected values in the form inputs
  document.querySelector("#placeName").value = targetPlace;
  document.querySelector("#placeCity").value = targetCity;
  document.querySelector("#placeCountry").value = targetCountry;
  document.querySelector("#placeHighlights").value = targetHighL;
  document.querySelector("#placeDescription").value = targetDesc;
  document.querySelector("#packagePrice").value = targetPrice;
  document.querySelector("#packageDays").value = targetDays;

  // changing buttons textContent
  adminFormBtn.textContent = "Edit package";
}

// listnening click event on form btn;
adminFormBtn.addEventListener("click", (e) => {
  if (e.target.textContent.toLowerCase() === "edit package") editPackage(e);
});

function editPackage(event) {
  event.preventDefault();

  // getting updated input values
  const placeName = document.querySelector("#placeName").value;
  const placeCity = document.querySelector("#placeCity").value;
  const placeCountry = document.querySelector("#placeCountry").value;
  const placeHighlights = document.querySelector("#placeHighlights").value;
  const placeDescription = document.querySelector("#placeDescription").value;
  const packagePrice = document.querySelector("#packagePrice").value;
  const packageDays = document.querySelector("#packageDays").value;
  const placeHighlightsArr = placeHighlights.toLowerCase().split(",");

  // validating user inputs
  if (
    !placeName ||
    !placeCity ||
    !placeCountry ||
    !placeHighlights ||
    !placeDescription ||
    !packagePrice ||
    !packageDays
  ) {
    alert("Enter all details");
    return;
  }

  // creating new package
  const package = {
    placeName: placeName,
    placeCity: placeCity,
    placeCountry: placeCountry,
    placeHighlights: placeHighlightsArr,
    placeDescription: placeDescription,
    packagePrice: packagePrice,
    packageDays: packageDays,
  };

  // adding package to the places array and storing it in localstorage
  const index = places.findIndex((dest) => {
    return (
      dest.placeName === targetedCardObj.targetPlace &&
      dest.placeCity === targetedCardObj.targetCity
    );
  });
  console.log(index);

  if (index === -1) {
    return;
  }
  places.splice(index, 1, package);
  localStorage.setItem("places", JSON.stringify(places));
  alert("Package added Successfully !");
  // clearing from
  clearForm();
  adminFormBtn.textContent = "Add Package";
  // displaying
  adminPagePackages.innerHTML = "";
  adminPageDisplay(places);
}

//----------------------------------------- user display and other functionallity
const usersDiv = document.querySelector(".users");
displayUsers(existedUsers);
function displayUsers(users) {
  usersDiv.innerHTML = users
    .map(
      (user, index) => `
    <div class="userWrapper" id="userCard_${index}">
    <h2>${user.name}</h2>
    <h3>${user.email}</h3>
    <button class="deleteUser">Delete User</button>
    </div>
    `
    )
    .join("");
}

// ------------------- delete user function
document.body.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteUser")) {
    const confirmation = confirm("Are you sure to delete this user ?");
    if (confirmation) {
      deleteUser(e);
    }
    return;
  }
});

function deleteUser(event) {
  event.preventDefault();
  const targetedUser = event.target.parentNode;
  const targetName = targetedUser.children[0].textContent;
  const targetEmail = targetedUser.children[1].textContent;

  const index = existedUsers.findIndex( (user) => {
    return user.name === targetName && user.email === targetEmail;
  })

  // deleting it from registered user
  existedUsers.splice(index,1);
  localStorage.setItem('registeredUser' , JSON.stringify(existedUsers));
  
  const idx = allBookings.findIndex((user) => {
    return  user.email === targetEmail
  })
  // as well as from in allbookings
  allBookings.splice(index,1);
  localStorage.setItem('allBookings' , JSON.stringify(allBookings));

  alert('user deleted successfully')
  usersDiv.innerHTML = '';
  displayUsers(existedUsers);
}
