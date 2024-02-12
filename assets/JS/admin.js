const packageForm = document.querySelector("#addPackageForm");
const placesDiv = document.querySelector("#places");
const places = JSON.parse(localStorage.getItem("places")) || [];
const allBookings = JSON.parse(localStorage.getItem("allBookings"));

const adminPagePackages = document.querySelector(".adminPagePackages");
const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn");
const adminLoginBtn = document.querySelector("#adminLoginBtn");

document.addEventListener("DOMContentLoaded", () => {
  if (!isAdminLoggedIn) {
    alert('you must login first');
    location.href = '../html/login.html'
  }
});

if (isAdminLoggedIn) {
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

const adminFormBtn =document.querySelector("#adminFormBtn")
packageForm.addEventListener("submit", (e) => {
  if(adminFormBtn.textContent.toLowerCase() === "add package" ){
    addPackage(e);
    clearForm();
    return;
  }
  if(adminFormBtn.textContent.toLowerCase() === "edit package" ){
    editPackage(e);
    adminFormBtn.textContent = "Add package"
    return;
  }
    
});

function addPackage(e){
  e.preventDefault();
  adminFormBtn.textContent = "Add package";
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

  if (!isAdminLoggedIn) {
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
}

function clearForm() {
  document.querySelector("#placeName").value = "";
  document.querySelector("#placeCity").value = "";
  document.querySelector("#placeCountry").value = "";
  document.querySelector("#placeHighlights").value = "";
  document.querySelector("#placeDescription").value = "";
  document.querySelector("#packagePrice").value = "";
  document.querySelector("#packageDays").value = "";
}

// functions to display pacages added by admin


document.body.addEventListener("click", function (e) {
  if (e.target.classList.contains("deleteButton")) {
    const confirmation = confirm('are you sure ?')
    if (confirmation) deletePackage(e);
    return
  }
  if (e.target.classList.contains("editPackageBtn")) {
    const confirmation = confirm('are you sure ?')
    if (confirmation)  // edit goes here;
      setForm(e);
    return
  }
});

function deletePackage(event) {

  const targetPackage = event.target.parentNode;
  const targetCity = targetPackage.children[2].textContent;
  const targetPlace = targetPackage.children[1].textContent;
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

const targetedCardObj = {}
function setForm(event){
  event.preventDefault();
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  console.log('kkkk');
  const targetPackage = event.target.parentNode;
  const targetCity = targetPackage.children[2].textContent;
  const targetPlace = targetPackage.children[1].textContent;
  const targetCountry = targetPackage.children[3].textContent;
  const targetHighL = targetPackage.children[4].textContent;
  const targetDesc = targetPackage.children[5].textContent;
  const targetPrice = targetPackage.children[6].textContent.split('/')[0];
  const targetDays = targetPackage.children[7].textContent;
  const targetId = targetPackage.id;

  targetedCardObj.targetPlace =targetPlace;
  targetedCardObj.targetCity =targetCity;
  
  document.querySelector("#placeName").value = targetPlace;
  document.querySelector("#placeCity").value = targetCity;
  document.querySelector("#placeCountry").value = targetCountry;
  document.querySelector("#placeHighlights").value = targetHighL;
  document.querySelector("#placeDescription").value = targetDesc;
  document.querySelector("#packagePrice").value = targetPrice;
  document.querySelector("#packageDays").value = targetDays;
  adminFormBtn.textContent='Edit package'
  
}

adminFormBtn.addEventListener('click' , (e) =>{
  if (e.target.textContent.toLowerCase() === 'edit package') editPackage(e);
})

function editPackage(event) {
  event.preventDefault();
  console.log('editing....................');
  const placeName = document.querySelector("#placeName").value
  const placeCity = document.querySelector("#placeCity").value 
  const placeCountry =  document.querySelector("#placeCountry").value
  const placeHighlights = document.querySelector("#placeHighlights").value 
  const placeDescription = document.querySelector("#placeDescription").value
  const packagePrice = document.querySelector("#packagePrice").value
  const packageDays =  document.querySelector("#packageDays").value
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
 
  const index = places.findIndex((dest)=>{
    return dest.placeName === targetedCardObj.targetPlace && dest.placeCity === targetedCardObj.targetCity;
  })
  console.log(index);

  if(index === -1){
    return 
  }
  places.splice(index,1,package);
  console.log(places);
  localStorage.setItem("places", JSON.stringify(places));
  alert("Package added Successfully !");
  clearForm();
  adminFormBtn.textContent = 'Add Package'
  adminPagePackages.innerHTML ='';
  adminPageDisplay(places);

}
