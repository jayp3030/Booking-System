const places = JSON.parse(localStorage.getItem("places")) || []; // getting packages added by admin from local storage
const userBooking = JSON.parse(localStorage.getItem("userbooking")) || []; // getting booked packages added by user from local storage
const allBookings = JSON.parse(localStorage.getItem("allBookings")) || [];

const packages = document.querySelector("#travelPackages");
const loginBtn = document.querySelector("#loginBtn");

function validateUser() {
  return localStorage.getItem("isLoggedIn") === "true" ? true : false;
}
// to change the button text content
if (validateUser()) {
  loginBtn.textContent = "logout";
}
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
  loginBtn.textContent = "login";
});

displayPackages(places);
function displayPackages(payload) {
  for (let place of payload) {
    const newPackage = document.createElement("div");
    newPackage.className = "main-newPackage";
    newPackage.id = `package`;

    const newPackageImg = document.createElement("img");
    newPackageImg.src = "../images/goa.jpg";
    newPackage.append(newPackageImg);
    newPackage.className = "main-newPackage";
    newPackage.id = `package`;
    newPackage.append(newPackageImg);

    const placeName = document.createElement("h2");
    placeName.textContent = place.placeName;
    newPackage.append(placeName);

    const placeCity = document.createElement("h3");
    placeCity.textContent = place.placeCity;
    newPackage.append(placeCity);

    const placeCountry = document.createElement("h4");
    placeCountry.textContent = place.placeCountry;
    newPackage.append(placeCountry);
    placeCountry.textContent = place.placeCountry;
    newPackage.append(placeCountry);

    const desc = document.createElement("p");
    desc.textContent = place.placeDescription;
    newPackage.append(desc);

    const highlights = document.createElement("p");
    highlights.textContent = `${place.placeHighlights}`;
    newPackage.append(highlights);

    const price = document.createElement("h3");
    price.textContent = `${place.packagePrice}/person`;
    newPackage.append(price);

    const duration = document.createElement("h4");
    duration.textContent = `${place.packageDays} days`;
    newPackage.append(duration);

    const bookingBtn = document.createElement("button");
    bookingBtn.id = "bookingBtn";
    bookingBtn.textContent = "Book Now";
    bookingBtn.onclick = (e) => {
      handleBooking(e);
    };
    bookingBtn.textContent = "Book Now";

    newPackage.append(bookingBtn);

    packages.appendChild(newPackage);
  }
}

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
    const searcherPackage = places.filter((place) => {
      return (
        place.placeName.toLowerCase().includes(userInput) ||
        place.placeCity.toLowerCase().includes(userInput)
      );
    });
    packages.innerHTML = "";
    displayPackages(searcherPackage);
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
    displayPackages(places);
    return;
  }
  console.log(sortedPackages);
  packages.innerHTML = "";
  displayPackages(sortedPackages);
});

// price filter
const minPriceInput = document.querySelector("#minPrice");
const maxPriceInput = document.querySelector("#maxPrice");
const priceFilterBtn = document.querySelector("#priceFilterBtn");
const priceFilterRmvBtn = document.querySelector("#priceFilterRmvBtn");

priceFilterBtn.addEventListener('click' , handleFilter);
priceFilterRmvBtn.addEventListener('click' , removeFilter);

function handleFilter() {
  const minPrice = parseFloat(minPriceInput.value) || 0;
  const maxPrice = parseFloat(maxPriceInput.value) || Infinity;

  const filteredPackages = places.filter((place) => {
    return place.packagePrice >= minPrice && place.packagePrice <= maxPrice;
  });

  console.log(filteredPackages);
  packages.innerHTML = "";
  displayPackages(filteredPackages);
}

function removeFilter() {
  minPriceInput.value = ''
  maxPriceInput.value = ''
  packages.innerHTML = "";
  displayPackages(places);
}
