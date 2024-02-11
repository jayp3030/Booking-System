const packageForm = document.querySelector("#addPackageForm");
const placesDiv = document.querySelector("#places");
const places = JSON.parse(localStorage.getItem("places")) || [];
const allBookings = JSON.parse(localStorage.getItem("allBookings"));

const adminPagePackages = document.querySelector(".adminPagePackages");
const isAdminLoggeIn = localStorage.getItem("isAdminLoggedIn");
const adminLoginBtn = document.querySelector("#adminLoginBtn");

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

const adminFormBtn =document.querySelector("#adminFormBtn")
packageForm.addEventListener("submit", (e) => {
  if(adminFormBtn.textContent.toLowerCase() === "add package" ){
    addPackage(e);
   
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
  adminPageFunction(places);
}
// see existing packages here

let i = 1;

adminPageFunction(places);

function adminPageFunction(payload) {
  for (let place of payload) {
    const newPackage = document.createElement("div");
    const newPackageImg = document.createElement("img");
    newPackageImg.src = "../images/goa.jpg";

    const placeName = document.createElement("h2");
    const placeCity = document.createElement("h3");
    const placeCountry = document.createElement("h4");

    newPackage.className = "main-newPackage";

    newPackage.id =i;
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

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete Package";
    deleteBtn.id = `deletePackageBtn${i}`;
    deleteBtn.className="deleteButton";
    newPackage.append(deleteBtn);

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit Package";
    editBtn.className = "editPackageBtn";
    newPackage.append(editBtn);

    adminPagePackages.appendChild(newPackage);
    i++;
  }
}

// document
//   .getElementsByClassName("deleteButton")
//   .addEventListener("click", (event) => {
//     deletePackage(event);
//   });

// var buttons = document.querySelectorAll('.deleteButton');


// buttons.forEach(function(button) {
//     button.addEventListener('click', function(event) {
//       alert("Are you sure to delete it?")
       
//         deletePackage(event);
        
//     });
// });

//////////               edit/delete eventlistener 

document.body.addEventListener("click", function (e) {
  if (e.target.classList.contains("editPackageBtn")) {
    const confirmation = confirm("Are you sure to Edit it?");
    if (confirmation) {
      editPackage(e);
      return;
    }
  }
  if (e.target.classList.contains("deleteButton")) {
    const confirmation = confirm("Are you sure to delete it?");
    if (confirmation) {
      deletePackage(e);
      return;
    }
  }
});

/// delete functionality

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

  // const filteredPackages = ParsedData.filter((dest, index) => {
  //   return (
  //     dest.placeCity !== targetCity &&
  //     dest.placeName !== targetPlace &&
  //     dest.placeCountry !== targetCountry
  //   );
  // });

  
  localStorage.setItem("places", JSON.stringify(places));
}

// edit functionality

function editPackage(event) {
   event.preventDefault();
  const targetPackage = event.target.parentNode;
  const targetCity = targetPackage.children[1].textContent;
  const targetPlace = targetPackage.children[2].textContent;
  const targetCountry = targetPackage.children[3].textContent;
  const targetHighLights = targetPackage.children[4].textContent;
  const targetDesc = targetPackage.children[5].textContent;
  const targetPrice = targetPackage.children[6].textContent;
  const targetDays = targetPackage.children[7].textContent;
  const targetId = targetPackage.id;
console.log(targetPackage);
console.log(targetCity);
console.log(targetPlace);
console.log(targetCountry);

  document.querySelector("#placeName").value = targetPlace ;
  document.querySelector("#placeCity").value = targetCity;
  document.querySelector("#placeCountry").value=targetCountry;
  document.querySelector("#placeHighlights").value=targetHighLights;
  document.querySelector("#placeDescription").value=targetDesc;
  document.querySelector("#packagePrice").value = targetPrice;
  document.querySelector("#packageDays").value = targetDays;

  adminFormBtn.textContent = "Edit package";
  window.location.protocol = 'top';
  
  
 
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
  
    const editedPackage = {
      placeName: placeName,
      placeCity: placeCity,
      placeCountry: placeCountry,
      placeHighlights: placeHighlightsArr,
      placeDescription: placeDescription,
      packagePrice: packagePrice,
      packageDays: packageDays,
    };
    console.log(editedPackage);
  
    // adding package to the places array and storing it in localstorage

    const index = places.findIndex((dest) => {
      console.log(dest.placeCity);
      console.log(dest.placeName);
      console.log(dest.placeCountry);
      return (
        dest.placeCity === targetPlace &&
        dest.placeName === targetCity &&
        dest.placeCountry === targetCountry
      );
    });
    places.splice(index,1,editedPackage);
    console.log(places);
    alert("Package added Successfully !");
    localStorage.setItem("places", JSON.stringify(places));
    
    
    //adminPagePackages.innerHTML ='';
    //adminPageFunction(places);
  
 
}
