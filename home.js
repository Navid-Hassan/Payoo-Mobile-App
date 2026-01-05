// ====================
// USER & DATA SETUP
// ====================

// Get current logged-in user from localStorage
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) {
  alert("Please log in first.");
  window.location.href = "./index.html"; // Redirect to login if no user
}

// Load all users and find current user's data
let users = JSON.parse(localStorage.getItem("payoooUsers")) || [];
let userObj = users.find((u) => u.mobile === currentUser.mobile);
let availableBalance = userObj ? userObj.balance : 45000; // Default if not found

// Load current user's transactions
let transactionData =
  JSON.parse(localStorage.getItem(`transactions_${currentUser.mobile}`)) || [];

// ====================
// HELPER FUNCTIONS
// ====================

// Update user's balance everywhere (UI, localStorage)
function updateUserBalance(newBalance) {
  // Update in users array
  const userIndex = users.findIndex((u) => u.mobile === currentUser.mobile);
  if (userIndex !== -1) {
    users[userIndex].balance = newBalance;
    localStorage.setItem("payoooUsers", JSON.stringify(users));
  }
  
  // Update current user's balance
  currentUser.balance = newBalance;
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  
  // Update UI
  document.getElementById("available-balance").innerText = newBalance;
}

// Save transaction to localStorage
function saveTransaction(transaction) {
  transactionData.push(transaction);
  localStorage.setItem(
    `transactions_${currentUser.mobile}`,
    JSON.stringify(transactionData)
  );
}

// Get number from input field
function getInputValueNumber(id) {
  const value = document.getElementById(id).value;
  return parseInt(value) || 0; // Return 0 if not a number
}

// Transfer money (deduct from balance)
function transferMoney(amountId) {
  const amount = getInputValueNumber(amountId);
  const currentBalance = parseInt(
    document.getElementById("available-balance").innerText
  );
  const remainingAmount = currentBalance - amount;
  updateUserBalance(remainingAmount);
}

// ====================
// FORM RESET FUNCTIONS
// ====================

function resetAddMoneyForm() {
  document.getElementById("account-number").value = "";
  document.getElementById("add-amount").value = "";
  document.getElementById("add-pin").value = "";
}

function resetCashOutForm() {
  document.getElementById("agent-number").value = "";
  document.getElementById("cash-out-amount").value = "";
  document.getElementById("cashout-pin").value = "";
}

function resetTransferForm() {
  document.getElementById("user-account").value = "";
  document.getElementById("transferred-amount").value = "";
  document.getElementById("transfer-pin").value = "";
}

function resetPayBillForm() {
  document.getElementById("biller-account-number").value = "";
  document.getElementById("pay-amount").value = "";
  document.getElementById("pay-bill-pin").value = "";
}

function resetGetBonusForm() {
  document.getElementById("bonus-coupon").value = "";
}

// ====================
// PAGE LOAD SETUP
// ====================

// Wait for page to load before setting up
window.onload = function () {
  // Set initial balance on page
  document.getElementById("available-balance").innerText = availableBalance;
  
  // Setup all button click listeners
  setupAllFunctions();
};

// ====================
// MAIN FUNCTION SETUP
// ====================

function setupAllFunctions() {
  console.log("Setting up all buttons...");
  
  // 1. ADD MONEY BUTTON
  document.getElementById("addMoney-btn").addEventListener("click", function (e) {
    e.preventDefault();
    
    // Get input values
    const accountNumber = document.getElementById("account-number").value;
    const amount = parseInt(document.getElementById("add-amount").value);
    const pin = getInputValueNumber("add-pin");
    
    // Basic validation
    if (accountNumber.length !== 11) {
      alert("Please provide valid account number (11 digits)");
      return;
    }
    
    if (pin !== currentUser.pin) {
      alert("Enter valid pin");
      return;
    }
    
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    
    // Calculate new balance
    const currentBalance = parseInt(
      document.getElementById("available-balance").innerText
    );
    const newBalance = currentBalance + amount;
    
    // Update balance
    updateUserBalance(newBalance);
    
    // Save transaction
    const transaction = {
      name: "Add Money",
      amount: amount,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    saveTransaction(transaction);
    
    alert(`Successfully added $${amount} to your account!`);
    
    // Reset form
    resetAddMoneyForm();
  });
  
  // 2. CASH OUT BUTTON
  document.getElementById("withdrawMoney-btn").addEventListener("click", function (e) {
    e.preventDefault();
    
    // Get input values
    const agentNumber = document.getElementById("agent-number").value;
    const amount = parseInt(document.getElementById("cash-out-amount").value);
    const pin = getInputValueNumber("cashout-pin");
    
    // Validation
    if (agentNumber.length !== 11) {
      alert("Please provide valid agent number (11 digits)");
      return;
    }
    
    if (pin !== currentUser.pin) {
      alert("Enter valid pin");
      return;
    }
    
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    
    // Check balance
    const currentBalance = parseInt(
      document.getElementById("available-balance").innerText
    );
    
    if (amount > currentBalance) {
      alert("Insufficient balance!");
      return;
    }
    
    // Update balance
    const newBalance = currentBalance - amount;
    updateUserBalance(newBalance);
    
    // Save transaction
    const transaction = {
      name: "Cash Out",
      amount: amount,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    saveTransaction(transaction);
    
    alert(`Successfully cashed out $${amount}!`);
    
    // Reset form
    resetCashOutForm();
  });
  
  // 3. TRANSFER MONEY BUTTON
  document.getElementById("transfer-btn").addEventListener("click", function (e) {
    e.preventDefault();
    
    // Get input values
    const userAccount = document.getElementById("user-account").value;
    const amount = getInputValueNumber("transferred-amount");
    const pin = getInputValueNumber("transfer-pin");
    
    // Validation
    if (userAccount.length !== 11) {
      alert("Enter valid account number (11 digits)");
      return;
    }
    
    if (pin !== currentUser.pin) {
      alert("Enter valid pin");
      return;
    }
    
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    
    // Check balance
    const currentBalance = parseInt(
      document.getElementById("available-balance").innerText
    );
    
    if (amount > currentBalance) {
      alert("Insufficient balance!");
      return;
    }
    
    // Process transfer
    transferMoney("transferred-amount");
    
    // Save transaction
    const transaction = {
      name: "Transfer Money",
      amount: amount,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    saveTransaction(transaction);
    
    alert(`Successfully transferred $${amount} to account ${userAccount}!`);
    
    // Reset form
    resetTransferForm();
  });
  
  // 4. PAY BILL BUTTON
  document.getElementById("payBill-btn").addEventListener("click", function (e) {
    e.preventDefault();
    
    // Get input values
    const billerAccount = document.getElementById("biller-account-number").value;
    const amount = getInputValueNumber("pay-amount");
    const pin = getInputValueNumber("pay-bill-pin");
    
    // Validation
    if (billerAccount.length !== 11) {
      alert("Enter valid account number (11 digits)");
      return;
    }
    
    if (pin !== currentUser.pin) {
      alert("Enter valid pin");
      return;
    }
    
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    
    // Check balance
    const currentBalance = parseInt(
      document.getElementById("available-balance").innerText
    );
    
    if (amount > currentBalance) {
      alert("Insufficient balance!");
      return;
    }
    
    // Process payment
    transferMoney("pay-amount");
    
    // Save transaction
    const transaction = {
      name: "Pay Bill",
      amount: amount,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    saveTransaction(transaction);
    
    alert(`Successfully paid bill of $${amount}!`);
    
    // Reset form
    resetPayBillForm();
  });
  
  // 5. GET BONUS BUTTON
  document.getElementById("get-bonus-btn").addEventListener("click", function (e) {
    e.preventDefault();
    
    // Get coupon code
    const coupon = document.getElementById("bonus-coupon").value.trim();
    const validCoupons = ["BONUS100", "WELCOME50", "PAYOOO25"];
    
    // Check if coupon is entered
    if (!coupon) {
      alert("Please enter a coupon code");
      return;
    }
    
    // Check if coupon is valid
    if (validCoupons.includes(coupon.toUpperCase())) {
      let bonusAmount = 0;
      if (coupon.toUpperCase() === "BONUS100") bonusAmount = 100;
      if (coupon.toUpperCase() === "WELCOME50") bonusAmount = 50;
      if (coupon.toUpperCase() === "PAYOOO25") bonusAmount = 25;
      
      // Add bonus to balance
      const currentBalance = parseInt(
        document.getElementById("available-balance").innerText
      );
      const newBalance = currentBalance + bonusAmount;
      updateUserBalance(newBalance);
      
      // Save transaction
      const transaction = {
        name: "Get Bonus",
        amount: bonusAmount,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      saveTransaction(transaction);
      
      alert(`Congratulations! You received $${bonusAmount} bonus!`);
      
      // Reset form
      resetGetBonusForm();
    } else {
      alert("Invalid coupon code. Try: BONUS100, WELCOME50, or PAYOOO25");
    }
  });
  
  // 6. TRANSACTIONS BUTTON
  document.getElementById("transactions-button").addEventListener("click", function (e) {
    const transactionContainer = document.getElementById("transaction-container");
    transactionContainer.innerHTML = "";
    
    // Show last 5 transactions
    const recentTransactions = transactionData.slice(-5);
    
    for (const data of recentTransactions) {
      const div = document.createElement("div");
      div.innerHTML = `
        <div class="flex items-center justify-between mb-[3px] py-[10px] bg-white rounded-xl">
          <div class="flex items-center gap-3 ml-[3px]">
            <div class="rounded-[100%] p-[10px] bg-[#f4f5f7]">
              <img src="./assets/wallet1.png" class="h-[2rem] w-[2rem]" alt="" />
            </div>
            <div>
              <p class="text-[#080808] font-semibold">${data.name} - $${data.amount || ""}</p>
              <p class="text-[#080808]">${data.date} ${data.time || ""}</p>
            </div>
          </div>
          <img class="brightness-10" src="./assets/three dots.png" alt="">
        </div>
      `;
      transactionContainer.appendChild(div);
    }
  });
  
  // 7. VIEW ALL BUTTON (in transactions)
  document.getElementById("view-all").addEventListener("click", function (e) {
    const transactionContainer = document.getElementById("transaction-container");
    transactionContainer.innerHTML = "";
    
    // Show ALL transactions
    for (const data of transactionData) {
      const div = document.createElement("div");
      div.innerHTML = `
        <div class="flex items-center justify-between mb-[3px] py-[10px] bg-white rounded-xl">
          <div class="flex items-center gap-3 ml-[3px]">
            <div class="rounded-[100%] p-[10px] bg-[#f4f5f7]">
              <img src="./assets/wallet1.png" class="h-[2rem] w-[2rem]" alt="" />
            </div>
            <div>
              <p class="text-[#080808] font-semibold">${data.name} - $${data.amount || ""}</p>
              <p class="text-[#080808]">${data.date} ${data.time || ""}</p>
            </div>
          </div>
          <img class="brightness-10" src="./assets/three dots.png" alt="">
        </div>
      `;
      transactionContainer.appendChild(div);
    }
  });
  
  // 8. MENU TOGGLE BUTTONS (Add Money, Cash Out, etc.)
  function toggleForm(formId, btn) {
    // Hide all forms
    const forms = document.getElementsByClassName("form");
    for (const form of forms) {
      form.style.display = "none";
    }
    
    // Show selected form
    document.getElementById(formId).style.display = "block";
    
    // Update button styles
    const formBtns = document.getElementsByClassName("form-btn");
    for (const formBtn of formBtns) {
      formBtn.classList.remove("border-[#0874f2]", "bg-[#0874f20d]");
      formBtn.classList.add("border-gray-300");
    }
    
    btn.classList.remove("border-gray-300");
    btn.classList.add("border-[#0874f2]", "bg-[#0874f20d]");
    
    // Reset all forms when switching
    resetAddMoneyForm();
    resetCashOutForm();
    resetTransferForm();
    resetPayBillForm();
    resetGetBonusForm();
  }
  
  // Attach toggle functions to menu buttons
  document.getElementById("add-button").addEventListener("click", function () {
    toggleForm("add-money-parent", this);
  });
  
  document.getElementById("cash-out-button").addEventListener("click", function () {
    toggleForm("cash-out-parent", this);
  });
  
  document.getElementById("transfer-button").addEventListener("click", function () {
    toggleForm("transfer-money-parent", this);
  });
  
  document.getElementById("bonus-button").addEventListener("click", function () {
    toggleForm("get-bonus-parent", this);
  });
  
  document.getElementById("payBill-button").addEventListener("click", function () {
    toggleForm("pay-bill-parent", this);
  });
  
  document.getElementById("transactions-button").addEventListener("click", function () {
    toggleForm("transaction-parent", this);
  });
  
  // 9. LOGOUT BUTTON
  document.getElementById("logout-button").addEventListener("click", function () {
    localStorage.removeItem("currentUser");
    window.location.href = "./index.html";
  });
  
  console.log("✅ All buttons are working!");
}