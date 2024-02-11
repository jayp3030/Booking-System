
const allBookings = JSON.parse(localStorage.getItem("allBookings")) || [];
const email = localStorage.getItem("email");

const userBooking = JSON.parse(localStorage.getItem("userbooking")) || [];


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
  let i=1;
  for (let place of payload) {
    const newPackage = document.createElement("div");
    newPackage.className = "main-newPackage";
    newPackage.id = `package`;

    const newPackageImg = document.createElement("img");
    newPackageImg.src = "../images/goa.jpg";
    newPackage.append(newPackageImg);
    newPackage.className = "main-newPackage";
    newPackage.id = `package_${i}`;
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
    const onePackPrice = place.packagePrice.split('/')[0] || place.packagePrice;
    const totalCost =  (place.members * onePackPrice);
    cost.textContent = `${totalCost}$`;
    newPackage.append(cost);

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
    i++;
  }
}

var buttons = document.querySelectorAll('.deleteButton');


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

  const index = userBooking.findIndex((dest)=>{
    return (dest.placeCity === targetCity && dest.placeName === targetPlace && dest.placeCountry === targetCountry)
  })
  console.log(index);

  userBooking.splice(index,1);

  // const filteredPackages = userBooking.filter((dest) => {
  //   console.log(dest.placeCity);
  //   console.log(dest.placeName);
  //   console.log(dest.placeCountry);
  //   return dest.placeCity !== targetCity && dest.placeName !== targetPlace && dest.placeCountry !== targetCountry
    
  // });

  
  //remove booking from allbooking array
  localStorage.setItem("userbooking", JSON.stringify(userBooking));

  const emailIndex = allBookings.findIndex((dest)=>{
    return (dest.email === email);
  })

 allBookings[emailIndex].bookings.splice(index,1);
  console.log(allBookings);
  localStorage.setItem("allBookings",JSON.stringify(allBookings));
  



}



