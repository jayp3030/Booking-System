// getting all the registered user
const registeredUser = JSON.parse(localStorage.getItem("registeredUser")) || [];

// setting registered user on dom loaded
document.addEventListener('DOMContentLoaded' , ()=>{
  localStorage.setItem('registeredUser' , JSON.stringify(registeredUser));
})


// registering user
const registerForm = document.getElementById("registerForm");
registerForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  // getting input values
  const name = document.getElementById("username").value;
  const email = document.getElementById("registerEmail").value;
  const passWord = document.getElementById("registerPwd").value;

  const isExist = registeredUser.filter((curr) => {
    return curr.email === email;
  });

  // if user already exist then we redirect user to login page
  if (isExist.length !== 0) {
    alert("User already registered please login..");
    location.href = "../html/login.html";
    return;
  }

  // else creating new user
  const obj = {
    name: name,
    email: email,
    passWord: passWord,
  };

  // adding new user to registered user
  registeredUser.push(obj);
  // updating registeredUser in local storage
  localStorage.setItem("registeredUser", JSON.stringify(registeredUser));
  // redirecting user for login
  window.location.href = "../html/login.html";
});

// user/admin login
const loginFormData = document.getElementById("loginForm");
loginFormData?.addEventListener("submit", (event) => {
  event.preventDefault();
  // getting values
  const role = document.getElementById("role").value;
  const email = document.getElementById("emailId").value;
  const passWord = document.getElementById("pwd").value;

  // checking role of user
  role === "admin" ? validateAdmin(email, passWord) : validateUser(email, passWord);
});

// funtion to validate the user credentials
function validateUser(email, passWord) {
  const loggedinUser = registeredUser.find((user) => {
    return user.email === email && user.passWord === passWord;
  });

  if (!loggedinUser) {
    alert("User Not Registered or invalid credentials..");
  } else {
    localStorage.setItem("email", email);
    localStorage.setItem("isLoggedIn", "true");
    alert("LoggedIn Successfully..");
    window.location.href = "../html/index.html";
  }
}

// funtion to validate the admin credentials
function validateAdmin(email, password) {
  const admin = {
    name: "admin",
    adminEmail: "admin@gmail.com",
    adminPass: "admin@123",
  };

  if (email === admin.adminEmail && password === admin.adminPass) {
    localStorage.setItem("isAdminLoggedIn", "true");
    alert("Admin Logged In Successfully!");
    location.href = "../html/admin.html";
  } else {
    alert("Invalid Credentials!");
  }
}