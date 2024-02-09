
const packageForm = document.querySelector("#addPackageForm");
const placesDiv = document.querySelector('#places')
const places = JSON.parse(localStorage.getItem("places")) || [];
const isAdminLoggeIn = localStorage.getItem('isAdminLoggedIn');
const adminLoginBtn = document.querySelector('#adminLoginBtn');

if (isAdminLoggeIn) {
    adminLoginBtn.textContent ='logout'
}

console.log(places);

// logout admin
adminLoginBtn.addEventListener('click' , ()=>{
    if (adminLoginBtn.textContent === 'logout' ) {
        localStorage.removeItem('isAdminLoggedIn');
        alert('Admin Logged out..')
        location.href = '../html/index.html'
    }
})

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
    alert('LogIn first to create an package')
    return
  }

  // validating user inputs
  if (!placeName || !placeCity || !placeCountry || !placeHighlights || !placeDescription || !packagePrice ||!packageDays) {
    alert('Enter all details')
    return;
  }

  const package = {
    placeName: placeName,
    placeCity: placeCity,
    placeCountry: placeCountry,
    placeHighlights: placeHighlightsArr,
    placeDescription:placeDescription,
    packagePrice: packagePrice,
    packageDays: packageDays,
  };
  console.log(package);

  // adding package to the places array and storing it in localstorage
  places.push(package);
  localStorage.setItem("places", JSON.stringify(places));
  alert('Package added Successfully !')
});



