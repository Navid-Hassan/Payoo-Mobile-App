// login button functionality
document.getElementById("loginButton").addEventListener("click",function(e){
    e.preventDefault();
    const mobileNumber = 01778548640;
    const pinNumber = 2002;

    const mobileNumberValue = parseInt(document.getElementById("mobile-number").value); 
  
    const pinNumberValue = parseInt(document.getElementById("pin-number").value);


    if(mobileNumber === mobileNumberValue && pinNumber === pinNumberValue){
        window.location.href="./home.html";
    }
    else{
        alert("Invalid information");
    }
})