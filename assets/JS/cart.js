const userBooking = JSON.parse(localStorage.getItem("userbooking")) || [];
console.log(userBooking);



//admin login/logout 

const isUserLoggedIn = localStorage.getItem('isLoggedIn');
const userLogInBtn = document.querySelector('#loginBtn');

if (isUserLoggedIn) {
    userLogInBtn.textContent ='logout'
}

// logout admin
userLogInBtn.addEventListener('click' , ()=>{
    if (userLogInBtn.textContent === 'logout' ) {
        localStorage.removeItem('isLoggedIn');
        alert('User Logged out..')
        location.href = '../html/index.html'
    }else if(userLogInBtn.textContent === 'login' ){
      location.href ='../html/login.html';
    }
})



//all booking details display

const bookedPackage = document.querySelector(".bookingReview");


displayPackages(userBooking);

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

    const cost = document.createElement('h4');
    const totalCost =  (place.members * place.packagePrice);
    console.log(totalCost);
    cost.textContent = `${totalCost}$`;

    const deleteBooking = document.createElement("button");
    deleteBooking.textContent = "Delete Package";
    deleteBooking.id = `deletePackageBtn`;
    deleteBooking.className = "deleteButton";
    newPackage.append(deleteBooking);

    const editBooking = document.createElement("button");
    editBooking.textContent = "Edit Package";
    editBooking.id = "editPackageBtn";
    newPackage.append(editBooking);

    bookedPackage.appendChild(newPackage);
  }
}

var buttons = document.querySelectorAll('#deletePackageBtn');


buttons.forEach(function(button) {
    button.addEventListener('click', function(event) {
      alert("Are you sure to delete it?")
       
        deletePackage(event);
        
    });
});


function deletePackage(event) {
  const targetPackage = event.target.parentNode;
  console.log(targetPackage);
  const targetCity = targetPackage.children[2].textContent;
  const targetPlace = targetPackage.children[1].textContent;
  const targetCountry = targetPackage.children[3].textContent;
  const targetId = targetPackage.id;
  
  document.getElementById(targetId).remove();
 
 
  const filteredPackages = userBooking.filter((dest) => {
    return (
      dest.placeCity !== targetCity &&
      dest.placeName !== targetPlace &&
      dest.placeCountry !== targetCountry
    );
  });

  console.log(filteredPackages);
  localStorage.setItem("userbooking", JSON.stringify(filteredPackages));
}



