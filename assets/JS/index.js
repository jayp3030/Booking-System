const places = JSON.parse(localStorage.getItem("places")) || []; // getting packages added by admin from local storage
const allBookings = JSON.parse(localStorage.getItem("allBookings")) || []; // getting all booking from local storage
const email = localStorage.getItem("email");
const packages = document.querySelector("#travelPackages"); // selecting div where we want to show all card

const userBooking = getUserBooking(email) || [];
// getting user booking details if exist in allBooking
function getUserBooking(email) {
  // very first time there is no booking in it so..
  if (allBookings.length === 0) {
    return {
      email: "",
      bookings: [],
    };
  }

  // now if there is already booking for loggedIn user then getting it
  const existedBooking = allBookings.filter((curr) => {
    return curr.email === email;
  });

  // but if there is new user booking then ..
  if (existedBooking.length === 0) {
    return {
      email: "",
      bookings: [],
    };
  }

  return existedBooking[0];
}

// setting value of userbooking to localstorage while page is loaded
document.addEventListener("DOMContentLoaded", () => {
  localStorage.setItem("userbooking", JSON.stringify(userBooking.bookings));
});

// to change the button text content
const loginBtn = document.querySelector("#loginBtn");
const validateUser = () => localStorage.getItem("isLoggedIn") === "true";
const updateLoginButtonText = () =>
  (loginBtn.textContent = validateUser() ? "logout" : "login");
updateLoginButtonText();
// logout user
loginBtn.addEventListener("click", (e) => {
  if (e.target.textContent === "login") {
    location.href = "../html/login.html";
    return;
  }
  console.log("logging out");
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("email");
  localStorage.removeItem("password");
  localStorage.removeItem("userbooking");
  updateLoginButtonText();
});

// cart validation
const cartBtn = document.querySelector("#cartBtn");
cartBtn.addEventListener("click", () => {
  if (!validateUser()) {
    alert("Login First...");
    location.href = "../html/login.html";
    return;
  } else {
    location.href = "../html/cart.html";
  }
});

//--------------------------------------- dynamic search functionality
const searchBar = document.querySelector("#search");
let debounceSearchTimeout;
searchBar.addEventListener("input", (e) => {
  clearTimeout(debounceSearchTimeout);
  debounceSearchTimeout = setTimeout(() => {
    const userInput = e.target.value.toLowerCase();
    const searchedPackage = places.filter((place) => {
      return (
        place.placeName.toLowerCase().includes(userInput) ||
        place.placeCity.toLowerCase().includes(userInput)
      );
    });
    packages.innerHTML = "";
    displayItems(currentPage, itemsPerPage, searchedPackage);
    // console.log(userInput);
  }, 500);
});

//------------------------------------------- Sort by functionality
const sortBySelect = document.querySelector("#sortBySelect");
sortBySelect.addEventListener("change", (e) => {
  const userInput = e.target.value;
  // sort will modify original array so that making copy of original array
  const sortedPackages = [...places];

  if (userInput.toLowerCase() === "price") {
    sortedPackages.sort((a, b) => a.packagePrice - b.packagePrice);
  } else if (userInput.toLowerCase() === "days") {
    sortedPackages.sort((a, b) => a.packageDays - b.packageDays);
  } else if (userInput.toLowerCase() === "default") {
    packages.innerHTML = "";
    displayItems(currentPage, itemsPerPage, places);
    return;
  }
  console.log(sortedPackages);
  packages.innerHTML = "";
  displayItems(currentPage, itemsPerPage, sortedPackages);
});

//------------------------------------------- price filter
const minPriceInput = document.querySelector("#minPrice");
const maxPriceInput = document.querySelector("#maxPrice");
const priceFilterBtn = document.querySelector("#priceFilterBtn");
const priceFilterRmvBtn = document.querySelector("#priceFilterRmvBtn");

priceFilterBtn.addEventListener("click", handleFilter);
priceFilterRmvBtn.addEventListener("click", removeFilter);

function handleFilter() {
  const minPrice = parseFloat(minPriceInput.value) || 0;
  const maxPrice = parseFloat(maxPriceInput.value) || Infinity;

  const filteredPackages = places.filter((place) => {
    return place.packagePrice >= minPrice && place.packagePrice <= maxPrice;
  });

  console.log(filteredPackages);
  packages.innerHTML = "";
  displayItems(currentPage, itemsPerPage, filteredPackages);
}

function removeFilter() {
  minPriceInput.value = "";
  maxPriceInput.value = "";
  packages.innerHTML = "";
  displayItems(currentPage, itemsPerPage, places);
}

// we are adding buttons dynamically so if new buttons are added to the page
// then they don't have event listner so we have to delegate event
// from body to that button..
document.body.addEventListener("click", function (e) {
  if (e.target.classList.contains("bookingBtn")) {
    handleBooking(e);
  }
});

//---------------------- handle booking function
function handleBooking(e) {
  // check thst user is loggein or not;
  if (!validateUser()) {
    alert("Login to book package");
    location.href = "../html/login.html";
    return;
  }
  const numOfMember = prompt("Enter the number of member");

  const parent = e.target.parentNode;

  const placeName = parent.children[1].textContent;
  const placeCity = parent.children[2].textContent;
  const placeCountry = parent.children[3].textContent;
  const placeHighlights = parent.children[5].textContent;
  const placeDescription = parent.children[4].textContent;
  const packagePrice = parent.children[6].textContent;
  const packageDays = parent.children[7].textContent;
  const placeHighlightsArr = placeHighlights.split(",");

  const booking = {
    placeName: placeName,
    placeCity: placeCity,
    placeCountry: placeCountry,
    placeHighlights: placeHighlightsArr,
    placeDescription: placeDescription,
    packagePrice: packagePrice,
    packageDays: packageDays,
    members: numOfMember,
  };

  console.log(userBooking.bookings);
  userBooking.bookings.push(booking);
  localStorage.setItem("userbooking", JSON.stringify(userBooking.bookings));

  const userWithBooking = {
    email: localStorage.getItem("email"),
    bookings: userBooking.bookings,
  };

  const existedUserIndex = allBookings.findIndex(
    (curr) => curr.email === localStorage.getItem("email")
  );

  if (existedUserIndex === -1) {
    console.log("not exist");
    allBookings.push(userWithBooking);
  } else {
    console.log("exist");
    console.log(allBookings[existedUserIndex].bookings);
    allBookings[existedUserIndex].bookings = userBooking.bookings; // Update the existing user's bookings
  }

  localStorage.setItem("allBookings", JSON.stringify(allBookings));
  console.log(allBookings);
}

//-------------------------- function which dynamically generate package card to display
function displayPackages(payload) {
  packages.innerHTML = payload
    .map((place) => {
      const {
        placeName,
        placeCity,
        placeCountry,
        placeDescription,
        placeHighlights,
        packagePrice,
        packageDays,
      } = place;

      return `
      <div class="main-newPackage" id="package">
      <img src="../images/goa.jpg" />
      <h2 class="place">${placeName}</h2>
      <h3 class="city">${placeCity}</h3>
      <h4 class="country">${placeCountry}</h4>
      <p class="desc">${placeDescription}</p>
      <p class="highlights">${placeHighlights}</p>
      <h3 class="price">${packagePrice}/person</h3>
      <h4 class="duration">${packageDays} days</h4>
      <button class="bookingBtn">Book Now</button>
      </div>
      `;
    })
    .join("");
}

// --------------------------------------------- pagination

// getting total pages
const itemsPerPage = 5; // Number of items per page
const totalItems = places.length; // Total number of items
let currentPage = 1; // Initial current page
const pages = getTotalPages(totalItems, itemsPerPage);

function getTotalPages(totalItems, itemsPerPage) {
  return Math.ceil(totalItems / itemsPerPage);
}

createNavigationButtons(pages);
displayItems(currentPage, itemsPerPage, places);

// dynamically create buttons as per requirments
function createNavigationButtons(totalPages) {
  const navigationContainer = document.getElementById("navigationContainer");
  navigationContainer.innerHTML = ""; // Clear previous buttons

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    // attaching event listner to each btn
    button.addEventListener("click", () => {
      navigateToPage(i);
    });
    navigationContainer.appendChild(button);
  }
}

// display items per page
function displayItems(pageNumber, itemsPerPage, arrayToShow) {
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // it will show 0-4 , 5-9 indexes
  const itemsToShow = arrayToShow.slice(startIndex, endIndex);
  packages.innerHTML = "";
  displayPackages(itemsToShow);
}

// Function to handle pagination navigation
function navigateToPage(pageNumber) {
  // Validate pageNumber
  if (pageNumber < 1 || pageNumber > pages) return;

  // Update current page
  currentPage = pageNumber;

  // Display items for the selected page
  displayItems(currentPage, itemsPerPage, places);
}
