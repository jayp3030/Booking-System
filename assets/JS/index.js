
const places = JSON.parse(localStorage.getItem("places")) || []; // getting packages added by admin from local storage
const userBooking = JSON.parse(localStorage.getItem("userbooking")) || []; // getting booked packages added by user from local storage

const loginBtn = document.querySelector('#loginBtn');
const packages = document.querySelector(".travelPackages");

if (validateUser) {
  loginBtn.textContent = 'logout'
}
const places = JSON.parse(localStorage.getItem("places")) || [];
console.log(places);


// reading JSOn data stored in json file
// const url = '../data/data.json';
// fetch(url)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data => {
//     destinations = data.destinations;
//     console.log(destinations[0]);
//   })
//   .catch(error => {
//     console.error('There was a problem with the fetch operation:', error);
//   });



const packages = document.querySelector(".travelPackages");

for (let place of places) {
  console.log(place);
  const newPackage = document.createElement("div");
  newPackage.className = "main-newPackage";
  newPackage.id = `package`;

  const newPackageImg = document.createElement("img");
  newPackageImg.src = "../images/goa.jpg";
  newPackage.append(newPackageImg);

  const placeName = document.createElement("h2");

  const placeCity = document.createElement("h3");
  const placeCountry = document.createElement("h4");

  newPackage.className = "main-newPackage";

  newPackage.id = `package`;
  newPackage.append(newPackageImg);


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

function handleBooking(e) {

  // check thst user is loggein or not;
  if (!validateUser()) {
    alert('Login to book package')
    location.href = '../html/login.html'
    retun;
  }
  const numOfMember = prompt('Enter the number of member')

  const parent = e.target.parentNode;
  console.log(parent);

  const placeName = parent.children[1].textContent;
  const placeCity = parent.children[2].textContent;
  const placeCountry = parent.children[3].textContent;
  const placeHighlights = parent.children[5].textContent;
  const placeDescription = parent.children[4].textContent;
  const packagePrice = parent.children[6].textContent;
  const packageDays = parent.children[7].textContent;

  const placeHighlightsArr = placeHighlights.split(',');

  const booking = {
    placeName: placeName,
    placeCity: placeCity,
    placeCountry: placeCountry,
    placeHighlights: placeHighlightsArr,
    placeDescription:placeDescription,
    packagePrice: packagePrice,
    packageDays: packageDays,
    members : numOfMember
  };

  userBooking.push(booking);
  localStorage.setItem('userbooking' , JSON.stringify(userBooking))
  console.log(userBooking);

}

function validateUser() {
  return JSON.parse(localStorage.getItem('isLoggedIn')) === true ? true : false
}

