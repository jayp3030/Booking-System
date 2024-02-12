const packageForm = document.querySelector("#addPackageForm");
const placesDiv = document.querySelector("#places");
const places = JSON.parse(localStorage.getItem("places")) || [];
const allBookings = JSON.parse(localStorage.getItem("allBookings"));

const adminPagePackages = document.querySelector(".adminPagePackages");
const isAdminLoggeIn = localStorage.getItem("isAdminLoggedIn");
const adminLoginBtn = document.querySelector("#adminLoginBtn");

document.addEventListener("DOMContentLoaded", () => {
  if (!isAdminLoggedIn) {
    alert('you must login first');
    location.href = '../html/login.html'
  }
});

if (isAdminLoggeIn) {
  adminLoginBtn.textContent ="logout";
}

// logout admin
adminLoginBtn.addEventListener("click", () => {
  if (adminLoginBtn.textContent === "logout") {
    localStorage.removeItem("isAdminLoggedIn");
    alert("Admin Logged out..");
    location.href = "../html/index.html";
  }
});

packageForm.addEventListener("submit", (e) => {
  e.preventDefault();
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

  if (!isAdminLoggeIn) {
    alert("LogIn first to create an package");
    return;
  }

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

  const package = {
    placeName: placeName,
    placeCity: placeCity,
    placeCountry: placeCountry,
    placeHighlights: placeHighlightsArr,
    placeDescription: placeDescription,
    packagePrice: packagePrice,
    packageDays: packageDays,
  };
  console.log(package);

  // adding package to the places array and storing it in localstorage
  places.push(package);
  localStorage.setItem("places", JSON.stringify(places));
  alert("Package added Successfully !");
  adminPagePackages.innerHTML ='';
  adminPageDisplay(places);
});


// functions to display pacages added by admin
adminPageDisplay(places);
function adminPageDisplay(payload) {
  adminPagePackages.innerHTML = payload.map((place, index) => `
    <div class="main-newPackage" id="package_${index}">
        <img src="../images/goa.jpg">
        <h2>${place.placeName}</h2>
        <h3>${place.placeCity}</h3>
        <h4>${place.placeCountry}</h4>
        <p>${place.placeDescription}</p>
        <p>${place.placeHighlights}</p>
        <h3>${place.packagePrice}</h3>
        <h4>${place.packageDays}</h4>
        <button class="deleteButton">Delete Package</button>
        <button id="editPackageBtn">Edit Package</button>
    </div>
`).join('');
}

document.body.addEventListener("click", function (e) {
  if (e.target.classList.contains("deleteButton")) {
    const confirmation = confirm('are you sure ?')
    if (confirmation) deletePackage(e);
    return
  }
  if (e.target.classList.contains("editPackageBtn")) {
    const confirmation = confirm('are you sure ?')
    if (confirmation)  // edit goes here;
    return
  }
});

function deletePackage(event) {

  const targetPackage = event.target.parentNode;
  const targetCity = targetPackage.children[1].textContent;
  const targetPlace = targetPackage.children[2].textContent;
  const targetCountry = targetPackage.children[3].textContent;
  const targetId = targetPackage.id;
  document.getElementById(targetId).remove();
  

  const index = places.findIndex((dest)=>{
    return (
          dest.placeCity === targetCity &&
          dest.placeName === targetPlace &&
          dest.placeCountry === targetCountry
        );
  })

  places.splice(index,1);
  localStorage.setItem("places", JSON.stringify(places));
}


// const filteredPackages = ParsedData.filter((dest, index) => {
//   return (
//     dest.placeCity !== targetCity &&
//     dest.placeName !== targetPlace &&
//     dest.placeCountry !== targetCountry
//   );
// });
