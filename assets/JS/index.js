const places = JSON.parse(localStorage.getItem("places")) || []; // getting packages added by admin from local storage
const userBooking = JSON.parse(localStorage.getItem("userbooking")) || []; // getting booked packages added by user from local storage
const allBookings = JSON.parse(localStorage.getItem("allBookings")) || [];

// getting total pages
function getTotalPages(totalItems, itemsPerPage) {
  return Math.ceil(totalItems / itemsPerPage);
}
const itemsPerPage = 5; // Number of items per page
const totalItems = places.length; // Total number of items
let currentPage = 1; // Initial current page

const packages = document.querySelector("#travelPackages");
const loginBtn = document.querySelector("#loginBtn");
const cartBtn = document.querySelector("#cartBtn");

const validateUser = () => localStorage.getItem("isLoggedIn") === "true";
// to change the button text content

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
  updateLoginButtonText();
});

// cart validation
cartBtn.addEventListener("click", () => {
  if (!validateUser()) {
    alert("Login First...");
    location.href = "../html/login.html";
    return;
  } else {
    location.href = "../html/cart.html";
  }
});

displayPackages(places);
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
        <h2>${placeName}</h2>
        <h3>${placeCity}</h3>
        <h4>${placeCountry}</h4>
        <p>${placeDescription}</p>
        <p>${placeHighlights}</p>
        <h3>${packagePrice}/person</h3>
        <h4>${packageDays} days</h4>
        <button class="bookingBtn">Book Now</button>
      </div>
    `;
    })
    .join("");
}

// we are adding buttons dynamically so if new buttons are added to the page then they don't have event listner so we have to delegate event
// from body to that button..
document.body.addEventListener("click", function (e) {
  if (e.target.classList.contains("bookingBtn")) {
    handleBooking(e);
  }
});
// handle booking
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

  userBooking.push(booking);
  localStorage.setItem("userbooking", JSON.stringify(userBooking));
  console.log(userBooking);

  const userWithBooking = {
    email: localStorage.getItem("email"),
    bookings: userBooking,
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
    allBookings[existedUserIndex].bookings = userBooking; // Update the existing user's bookings
  }

  localStorage.setItem("allBookings", JSON.stringify(allBookings));
  console.log(allBookings);
}

// dynamic search functionality
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

// Sort by functionality
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

// price filter
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

// -------------------------------- pagination ---------------------------------

// dynamically create buttons as per requirments
function createNavigationButtons(totalPages) {
  const navigationContainer = document.getElementById("navigationContainer");
  navigationContainer.innerHTML = ""; // Clear previous buttons

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
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

displayItems(currentPage, itemsPerPage, places);
createNavigationButtons(getTotalPages(totalItems, itemsPerPage));

// Function to handle pagination navigation
function navigateToPage(pageNumber) {
  // Validate pageNumber
  if (pageNumber < 1 || pageNumber > getTotalPages(totalItems, itemsPerPage)) {
    return;
  }

  // Update current page
  currentPage = pageNumber;

  // Display items for the selected page
  displayItems(currentPage, itemsPerPage, places);
}
