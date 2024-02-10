const places = JSON.parse(localStorage.getItem("places")) || []; // getting packages added by admin from local storage
const userBooking = JSON.parse(localStorage.getItem("userbooking")) || []; // getting booked packages added by user from local storage

const packages = document.querySelector(".travelPackages");
const loginBtn = document.querySelector("#loginBtn");

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
    price.textContent = place.packagePrice;
    newPackage.append(price);

    const duration = document.createElement("h4");
    duration.textContent = place.packageDays;
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

function handleBooking(e) {
  // check thst user is loggein or not;
  if (!validateUser()) {
    alert("Login to book package");
    location.href = "../html/login.html";
    return;
  }
  const numOfMember = prompt("Enter the number of member");

  const parent = e.target.parentNode;
  console.log(parent);

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
}

function validateUser() {
  return JSON.parse(localStorage.getItem("isLoggedIn")) === true ? true : false;
}




