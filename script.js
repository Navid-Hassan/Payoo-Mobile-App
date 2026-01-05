// =============================
// SIMPLE LOGIN SYSTEM
// =============================

// Clear everything and setup fresh database
localStorage.clear();

// Store users with EXACT 11-digit numbers
const users = [
  { name: "Navid Hassan", mobile: "01778548640", pin: 2002, balance: 50000 },
  { name: "Nishad Ahamed", mobile: "01742844817", pin: 2003, balance: 60000 },
  { name: "Mohammed Abrar", mobile: "01887664856", pin: 2004, balance: 75000 },
  { name: "Nazmul Hasan", mobile: "01303587830", pin: 2005, balance: 55000 }
];

// Save to localStorage
localStorage.setItem("payoooUsers", JSON.stringify(users));
console.log("✅ Database ready with 4 users");

// Login button click
document.getElementById("loginButton").addEventListener("click", function(e) {
  e.preventDefault();
  
  // Get values
  const mobileInput = document.getElementById("mobile-number").value.trim();
  const pinInput = document.getElementById("pin-number").value.trim();
  
  // Check if empty
  if (!mobileInput || !pinInput) {
    alert("Please enter mobile and PIN");
    return;
  }
  
  // Get users from localStorage
  const storedUsers = JSON.parse(localStorage.getItem("payoooUsers"));
  
  // Find matching user
  const foundUser = storedUsers.find(user => 
    user.mobile === mobileInput && 
    user.pin === parseInt(pinInput)
  );
  
  if (foundUser) {
    // Save current user
    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    console.log("Login success:", foundUser.name);
    
    // Go to dashboard
    window.location.href = "./home.html";
  } else {
    alert("Wrong mobile or PIN");
  }
});

console.log("Simple login system ready");