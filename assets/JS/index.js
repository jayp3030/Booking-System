const places = [
  {
    placeName: "Goa",
    placeCity: "Panji",
    Country: "India",
    description:"Goa, a tiny emerald on the west coast of India, with its natural Scenic beauty, abundant greenery, attractive beaches, historical temples and churches",
    highlights: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral"],
    price: "$1000",
    duration: "5 Days",
  },
  {
    placeName: "Tokyo",
    placeCity: "Tokyo",
    Country: "Japan",
    description:"Tokyo is the administrative, cultural, financial, commercial, and educational centre of Japan and the focus of an extensive urban complex that includes Kawasaki and Yokohama.",
    highlights: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral"],
    price: "$2000",
    duration: "10 Days",
  },
  {
    placeName: "New York City",
    placeCity: "New York City",
    Country: "USA",
    description:"New York City, the city that never sleeps, is a melting pot of cultures, entertainment, and world-famous attractions.",
    highlights: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral"],
    price: "$1500",
    duration: "8 Days",
  },

];

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
  placeCountry.textContent = place.Country;
  newPackage.append(placeCountry);
  const desc = document.createElement('p');
  desc.textContent=place.description;
  newPackage.append(desc);
  const highlights = document.createElement("p");
  highlights.textContent = `[${place.highlights}]`;
  newPackage.append(highlights);
  const price = document.createElement("h3");
  price.textContent = place.price;
  newPackage.append(price);
  const duration = document.createElement("h4");
  duration.textContent = place.duration;
  newPackage.append(duration);

  const bookingBtn = document.createElement('button');
  bookingBtn.textContent ="Book Now"

  newPackage.append(bookingBtn);


  packages.appendChild(newPackage);
}

