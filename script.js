// Initialize users if not exists in localStorage

       //////Local Storage as Darabase

if (!localStorage.getItem("payoooUsers")) {
  const users = [
    { name: "Navid Hassan", mobile: 01778548640, pin: 2002, balance: 50000 },
    { name: "Nishad Ahamed", mobile: 01742844817, pin: 2003, balance: 60000 },
    { name: "Mohammed Abrar", mobile: 01887664856, pin: 2004, balance: 75000 },
    { name: "Nazmul Hasan", mobile: 01303587830, pin: 2005, balance: 55000 },
  ];
  localStorage.setItem("payoooUsers", JSON.stringify(users));
}


// login button functionality

document.getElementById("loginButton").addEventListener("click", function(e){
    e.preventDefault();
    
    // Get input values
    const mobileNumber = parseInt(document.getElementById("mobile-number").value); 
    const pinNumber = parseInt(document.getElementById("pin-number").value);
    
    // Get all users from database
    const users = JSON.parse(localStorage.getItem("payoooUsers")) || [];
    
    // Find user with matching mobile and PIN
    const foundUser = users.find(
        (user) => user.mobile === mobileNumber && user.pin === pinNumber
    );
    
    if (foundUser) {
        // Save current user to localStorage
        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        // Redirect to home page
        window.location.href = "./home.html";
    } else {
        alert("Invalid mobile number or PIN.");
    }
});