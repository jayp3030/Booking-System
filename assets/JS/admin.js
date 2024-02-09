const packageForm = document.querySelector("#addPackageForm");

const places = JSON.parse(localStorage.getItem("places")) || [];


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

  places.push(package);
  localStorage.setItem("places", JSON.stringify(places));
  alert("Package added Successfully !");
});

// see existing packages here

const adminPagePackages = document.querySelector(".adminPagePackages");
let i=1;
for (let place of places) {
  
  const newPackage = document.createElement("div");
  const newPackageImg = document.createElement("img");
  newPackageImg.src = "../images/goa.jpg";

  const placeName = document.createElement("h2");
  const placeCity = document.createElement("h3");
  const placeCountry = document.createElement("h4");

  newPackage.className = "main-newPackage";

  newPackage.id = `package_${i}`;
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

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent="Delete Package";
  deleteBtn.id = `deletePackageBtn${i}`
  newPackage.append(deleteBtn);

  const editBtn = document.createElement('button');
  editBtn.textContent= "Edit Package";
  editBtn.id= 'editPackageBtn';
  newPackage.append(editBtn);


  adminPagePackages.appendChild(newPackage);
  i++;
}

document.getElementsByClassName("adminPagePackages")[0].addEventListener("click",(event)=>{
  
  deletePackage(event);

//   const targetPackage = event.target.parentNode;
//   const targetCity = targetPackage.children[1].textContent
//   const targetPlace = targetPackage.children[2].textContent
//   const targetCountry = targetPackage.children[3].textContent
//   const targetId=targetPackage.id;
  
  
//   document.getElementById(targetId).remove();

// const dataOfPackages = localStorage.getItem("places");


// const ParsedData = JSON.parse(dataOfPackages);



//  const filteredPackages=ParsedData.filter((dest,index)=>{
// return (dest.placeCity !== targetCity && dest.placeName !== targetPlace && dest.placeCountry !== targetCountry )

// })
    
//  console.log(filteredPackages);
//  localStorage.setItem("places", JSON.stringify(filteredPackages));

})


function deletePackage(event){

  const targetPackage = event.target.parentNode;
  const targetCity = targetPackage.children[1].textContent
  const targetPlace = targetPackage.children[2].textContent
  const targetCountry = targetPackage.children[3].textContent
  const targetId=targetPackage.id;
  
  
  document.getElementById(targetId).remove();

const dataOfPackages = localStorage.getItem("places");


const ParsedData = JSON.parse(dataOfPackages);



 const filteredPackages=ParsedData.filter((dest,index)=>{
return (dest.placeCity !== targetCity && dest.placeName !== targetPlace && dest.placeCountry !== targetCountry )

})
    
 console.log(filteredPackages);
 localStorage.setItem("places", JSON.stringify(filteredPackages));

}