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

displayPackages(places);

function displayPackages(payload) {
  for (let place of payload) {
    console.log(place);
    const newPackage = document.createElement("div");
    const newPackageImg = document.createElement("img");
    newPackageImg.src = "../images/goa.jpg";

    const placeName = document.createElement("h2");
    const placeCity = document.createElement("h3");
    const placeCountry = document.createElement("h4");

    newPackage.className = "main-newPackage";

    newPackage.id = `package`;
    newPackage.append(newPackageImg);

    placeName.textContent = place.placeName;
    newPackage.append(placeName);
    placeCity.textContent = place.placeCity;
    newPackage.append(placeCity);
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
    bookingBtn.textContent = "Book Now";

    newPackage.append(bookingBtn);

    packages.appendChild(newPackage);
  }
}



const searchBox = document.getElementById("search");
