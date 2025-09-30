const validPin = 1234;
const transactionData = [];
// Shared functions

function getInputValueNumber(id) {
  const inputField = parseInt(document.getElementById(id).value);

  return inputField;
}

function transferMoney(amount) {
  const givenAmount = getInputValueNumber(amount);
  const availableBalance = parseInt(
  document.getElementById("available-balance").innerText
);

  const remainingAmount = availableBalance - givenAmount;
  document.getElementById("available-balance").innerText = remainingAmount;
}

// add money

document.getElementById("addMoney-btn").addEventListener("click", function (e) {
  e.preventDefault();

  const bank = document.getElementById("bank").value;
  const accountNumber = document.getElementById("account-number").value;
  const amount = parseInt(document.getElementById("add-amount").value);
  const pin = getInputValueNumber("add-pin");

  const availableBalance = parseInt(
    document.getElementById("available-balance").innerText
  );

  if (accountNumber.length != 11) {
    alert("Please provide valid account number");
    return;
  }

  if (pin != validPin) {
    alert("Enter valid pin");
    return;
  }

  const totalAvailableBalance = amount + availableBalance;

  document.getElementById("available-balance").innerText =
    totalAvailableBalance;


    const data = {
      name:"Add Money",
      date:new Date().toLocaleDateString()
    }
    transactionData.push(data);

});

// Cash out

document
  .getElementById("withdrawMoney-btn")
  .addEventListener("click", function (e) {
    e.preventDefault();
    const pinNumber = 1234;

    const agentNumber = document.getElementById("agent-number").value;
    if (agentNumber.length != 11) {
      alert("Please provide valid agent number");
      return;
    }

    const cashOutAmount = parseInt(
      document.getElementById("cash-out-amount").value
    );
    const pin = parseInt(document.getElementById("cashout-pin").value);

    if (pin != pinNumber) {
      alert("Enter valid pin");
      return;
    }
    const availableBalance = parseInt(
      document.getElementById("available-balance").innerText
    );

    const totalAvailableBalance = availableBalance - cashOutAmount;

    document.getElementById("available-balance").innerText =
      totalAvailableBalance;

      const data = {
      name:"Cash Out",
      date:new Date().toLocaleDateString()
    }
    transactionData.push(data);
  });

// Transfer Money

document.getElementById("transfer-btn").addEventListener("click", function (e) {
  e.preventDefault();
  const userAccount = document.getElementById("user-account").value;

  const transferPin = getInputValueNumber("transfer-pin");

  if (userAccount.length != 11) {
    alert("Enter valid account number");
    return;
  }
  if (transferPin != validPin) {
    alert("Enter valid pin");
    return;
  }

  transferMoney("transferred-amount");


  const data = {
      name:"Transfer Money",
      date:new Date().toLocaleDateString()
    }
    transactionData.push(data);

});

// Pay bill

document.getElementById("payBill-btn").addEventListener("click",function(e){
  e.preventDefault();
   const userAccount = document.getElementById("biller-account-number").value;

  const transferPin = getInputValueNumber("pay-bill-pin");

  if (userAccount.length != 11) {
    alert("Enter valid account number");
    return;
  }
  if (transferPin != validPin) {
    alert("Enter valid pin");
    return;
  }

  transferMoney("pay-amount");

  const data = {
      name:"Pay Bill",
      date:new Date().toLocaleDateString()
    }
    transactionData.push(data);
})

// transactionData
document.getElementById("transactions-button").addEventListener("click",function(e){
  console.log(transactionData);

  const transactionContainer = document.getElementById("transaction-container");
  transactionContainer.innerText = "";

  for(const data of transactionData){
    const div = document.createElement("div");
    div.innerHTML =`
    <div  class="flex items-center justify-between mb-[3px] py-[10px] bg-white rounded-xl">
          <div class="flex items-center gap-3 ml-[3px]">
          <div class="rounded-[100%] p-[10px] bg-[#f4f5f7]"><img src="./assets/wallet1.png" class="h-[2rem] w-[2rem]" alt="" /></div>
          <div>
            <p class="text-[#080808] font-semibold">${data.name}</p>
            <p class="text-[#080808]">${data.date}</p>
          </div>
        </div>
      <img class="brightness-10" src="./assets/three dots.png" alt="">
        </div>
    ` 

    transactionContainer.appendChild(div);
  }
})

// toggling features

function toggle(e, btn) {
  const forms = document.getElementsByClassName("form");

  for (const form of forms) {
    form.style.display = "none";
  }

  document.getElementById(e).style.display = "block";

  const formBtns = document.getElementsByClassName("form-btn");

  for (const formBtn of formBtns) {
    formBtn.classList.remove("border-[#0874f2]", "bg-[#0874f20d]");
    formBtn.classList.add("border-gray-300");
  }

  btn.classList.remove("border-gray-300");

  btn.classList.add("border-[#0874f2]", "bg-[#0874f20d]");
}

document.getElementById("add-button").addEventListener("click", function (e) {
  toggle("add-money-parent", this);
});

document
  .getElementById("cash-out-button")
  .addEventListener("click", function (e) {
    toggle("cash-out-parent", this);
  });

document
  .getElementById("transfer-button")
  .addEventListener("click", function (e) {
    toggle("transfer-money-parent", this);
  });

document.getElementById("bonus-button").addEventListener("click", function (e) {
  toggle("get-bonus-parent", this);
});

document.getElementById("payBill-button").addEventListener("click", function (e) {
  toggle("pay-bill-parent", this);
});

document.getElementById("transactions-button").addEventListener("click",function(e){
  toggle("transaction-parent",this);
})

// Logout
document
  .getElementById("logout-button")
  .addEventListener("click", function (e) {
    window.location.href = "./index.html";
  });
