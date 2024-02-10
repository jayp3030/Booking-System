
const registeredUser = JSON.parse(localStorage.getItem("registeredUser")) || []; 
const registerForm = document.getElementById('registerForm');

// registering user 
registerForm?.addEventListener('submit',(event)=>{
    event.preventDefault();
    const name = document.getElementById('username').value;
    const email = document.getElementById('registerEmail').value;
    const passWord = document.getElementById('registerPwd').value;

    const obj = {
        name:name,
        email:email,
        passWord:passWord
    }

    registeredUser.push(obj);
    localStorage.setItem("registeredUser",JSON.stringify(registeredUser));
    window.location.href="../html/login.html";
})

// user/admin login
const loginFormData = document.getElementById("loginForm");
loginFormData?.addEventListener('submit',(event)=>{
    event.preventDefault();
    const email = document.getElementById('emailId').value;
    const passWord = document.getElementById('pwd').value;
    const role =document.getElementById("role").value;

    if(role === "admin") {
        validateAdmin(email,passWord);
        return 
    }

    const loggedinUser = registeredUser.find((user)=>{
        return (user.email === email && user.passWord === passWord)
     } )
    
     if (!loggedinUser) {
        alert('User Not Registered or invalid credentials..')
    //    window.location.href="../html/register.html";
     }else{
        localStorage.setItem("email",email);
        localStorage.setItem("password",passWord);
        localStorage.setItem('isLoggedIn','true');
        alert('LoggedIn Successfully..')
         window.location.href="../html/index.html";
     }    
})


// funtion to validate the admin credentials
function validateAdmin(email , password){
    const admin = {
        name : 'admin',
        adminEmail : 'admin@gmail.com',
        adminPass : 'admin@123'
    }

    if (email === admin.adminEmail && password === admin.adminPass) {
        localStorage.setItem('isAdminLoggedIn','true')
        alert('Admin Logged In Successfully!')
        location.href='../html/admin.html'
    }
    else{
        alert('Invalid Credentials!')
    }
}