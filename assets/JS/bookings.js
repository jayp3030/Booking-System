const allBookings = JSON.parse(localStorage.getItem("allBookings"));

viewAllBookings(allBookings);

function viewAllBookings(allBookings) {
  const userAllBookings = document.querySelector(".allBooking");
  console.log("hello");

  let cnt = 1;
  for (user of allBookings) {
    const oneUsersBooking = document.createElement("div");
    oneUsersBooking.id = `module_${cnt}`;

    console.log(user.bookings);
    const userEmail = document.createElement("h4");
    userEmail.textContent = "User Email : ";
    oneUsersBooking.append(userEmail);

    const Email = document.createElement("h5");
    Email.className = "emailId";
    Email.innerText = user.email;
    oneUsersBooking.append(Email);

    adminPageFunction(user.bookings);

    function adminPageFunction(payload) {
      var i = 1;
      for (let place of payload) {
        const newPackage = document.createElement("div");
        const newPackageImg = document.createElement("img");
        newPackageImg.src = "../images/goa.jpg";

        const placeName = document.createElement("h2");
        const placeCity = document.createElement("h3");
        const placeCountry = document.createElement("h4");

        newPackage.className = "main-newPackage";

        newPackage.id = `package_${i}`;
        i++;
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
        deleteBtn.id = `deletePackageBtn`;
        deleteBtn.className = "deleteButton";
        newPackage.append(deleteBtn);

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit Package";
        editBtn.id = "editPackageBtn";
        newPackage.append(editBtn);

        oneUsersBooking.appendChild(newPackage);
      }
    }

    userAllBookings.appendChild(oneUsersBooking);
    cnt++;
  }
}

var buttons = document.querySelectorAll(".deleteButton");

buttons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    alert("Are you sure to delete it?");

    deletePackage(event);
  });
});

function deletePackage(event) {
  const targetPackage = event.target.parentNode;
  const targetCity = targetPackage.children[1].textContent;
  const targetPlace = targetPackage.children[2].textContent;
  const targetCountry = targetPackage.children[3].textContent;
  const targetId = targetPackage.id;

  const emailValue = targetPackage.parentNode.children[1].textContent;
  console.log(emailValue);

  document.getElementById(targetId).remove();

  const emailIndex = allBookings.findIndex((dest) => {
    return dest.email === emailValue;
  });
  
  const index = allBookings[emailIndex].bookings.findIndex((dest) => {
    
    return (
      dest.placeCity === targetPlace && dest.placeName === targetCity && dest.placeCountry === targetCountry);
  });
  console.log(index);

  allBookings[emailIndex].bookings.splice(index, 1);
  console.log(allBookings);
  localStorage.setItem("allBookings", JSON.stringify(allBookings));
}
