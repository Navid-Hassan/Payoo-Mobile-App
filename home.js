// ============================================
// PAYOOO BANK SYSTEM - DASHBOARD SCRIPT
// ============================================

// Global variables
let currentUser = null;
let users = [];
let transactionData = [];

// Initialize application
function initializeApp() {
  // Check if user is logged in
  const userData = localStorage.getItem("currentUser");
  if (!userData) {
    alert("Please login first");
    window.location.href = "./index.html";
    return;
  }
  
  // Parse user data
  currentUser = JSON.parse(userData);
  users = JSON.parse(localStorage.getItem("payoooUsers")) || [];
  
  // Load user transactions
  transactionData = JSON.parse(localStorage.getItem(`transactions_${currentUser.mobile}`)) || [];
  
  // Update UI
  updateUserInterface();
  
  // Setup event listeners
  setupEventListeners();
  
  console.log(`✅ Dashboard loaded for ${currentUser.name}`);
}

// Update UI elements
function updateUserInterface() {
  // Update balance
  const balanceElement = document.getElementById("available-balance");
  if (balanceElement && currentUser) {
    balanceElement.textContent = currentUser.balance.toLocaleString();
  }
  
  // Update greeting
  const greetingElement = document.getElementById("user-greeting");
  if (greetingElement && currentUser.name) {
    greetingElement.textContent = `Hello, ${currentUser.name.split(' ')[0]}!`;
  }
  
  // Update transaction count
  updateTransactionCount();
}

// Get transaction icon based on type
function getTransactionIcon(transactionName) {
  const iconMap = {
    "Add Money": "wallet1.png",
    "Cash Out": "send1.png",
    "Transfer Money": "money1.png",
    "Money Received": "money1.png",
    "Pay Bill": "purse1.png",
    "Get Bonus": "bonus1.png"
  };
  return iconMap[transactionName] || "wallet1.png";
}

// Update transaction count display
function updateTransactionCount() {
  const countElement = document.getElementById("transaction-count");
  if (countElement) {
    const count = transactionData.length;
    countElement.textContent = `${count} transaction${count !== 1 ? 's' : ''}`;
  }
}

// Save transaction to database
function saveTransaction(transaction) {
  transactionData.push(transaction);
  localStorage.setItem(`transactions_${currentUser.mobile}`, JSON.stringify(transactionData));
  updateTransactionCount();
}

// Update user balance with animation
function updateUserBalance(newBalance) {
  // Update in memory
  currentUser.balance = newBalance;
  
  // Update in users array
  const userIndex = users.findIndex(u => u.mobile === currentUser.mobile);
  if (userIndex !== -1) {
    users[userIndex].balance = newBalance;
    localStorage.setItem("payoooUsers", JSON.stringify(users));
  }
  
  // Update current user in localStorage
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  
  // Update UI with animation
  const balanceElement = document.getElementById("available-balance");
  if (balanceElement) {
    balanceElement.textContent = newBalance.toLocaleString();
    balanceElement.parentElement.classList.add("balance-updated");
    setTimeout(() => {
      balanceElement.parentElement.classList.remove("balance-updated");
    }, 500);
  }
}

// Update recipient's balance (accepts string mobile)
function updateRecipientBalance(recipientMobile, amount) {
  // Convert to string for comparison
  const recipientMobileStr = recipientMobile.toString();
  const recipientIndex = users.findIndex(u => u.mobile.toString() === recipientMobileStr);
  
  if (recipientIndex !== -1) {
    users[recipientIndex].balance += amount;
    localStorage.setItem("payoooUsers", JSON.stringify(users));
    return true;
  }
  return false;
}

// Get numeric value from input
function getInputNumber(id) {
  const value = document.getElementById(id).value.trim();
  const num = parseInt(value);
  return isNaN(num) ? 0 : num;
}

// Validate 11-digit account number
function validateAccountNumber(accountNumber) {
  return /^\d{11}$/.test(accountNumber);
}

// Validate 4-digit PIN
function validatePIN(pin) {
  return /^\d{4}$/.test(pin.toString());
}

// Validate positive amount
function validateAmount(amount) {
  return amount > 0;
}

// Reset form functions
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

// Toggle between forms
function toggleForm(formId, activeButton) {
  // Hide all forms
  document.querySelectorAll('.form').forEach(form => {
    form.style.display = 'none';
  });
  
  // Show selected form
  const selectedForm = document.getElementById(formId);
  if (selectedForm) {
    selectedForm.style.display = 'block';
  }
  
  // Update button states
  document.querySelectorAll('.form-btn').forEach(btn => {
    btn.classList.remove('border-blue-500', 'bg-blue-50');
    btn.classList.add('border-gray-200');
  });
  
  if (activeButton) {
    activeButton.classList.remove('border-gray-200');
    activeButton.classList.add('border-blue-500', 'bg-blue-50');
  }
  
  // Reset all forms
  resetAddMoneyForm();
  resetCashOutForm();
  resetTransferForm();
  resetPayBillForm();
  resetGetBonusForm();
}

// Display transactions
function displayTransactions(showAll = false) {
  const container = document.getElementById("transaction-container");
  if (!container) return;
  
  container.innerHTML = "";
  
  if (transactionData.length === 0) {
    container.innerHTML = `
      <div class="text-center py-8">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-3">
          <img src="./assets/transaction1.png" class="h-8 w-8 opacity-50" alt="">
        </div>
        <p class="text-gray-500 font-medium">No transactions yet</p>
        <p class="text-sm text-gray-400 mt-1">Your transactions will appear here</p>
      </div>
    `;
    return;
  }
  
  // Determine which transactions to show
  const transactionsToShow = showAll ? transactionData : transactionData.slice(-5);
  
  // Display each transaction
  transactionsToShow.forEach(transaction => {
    const icon = getTransactionIcon(transaction.name);
    const div = document.createElement("div");
    div.className = "transaction-fade-in flex items-center p-3 border-b border-gray-100 last:border-0";
    
    div.innerHTML = `
      <div class="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
        <img src="./assets/${icon}" class="h-5 w-5" alt="">
      </div>
      <div class="flex-grow">
        <div class="flex justify-between items-start">
          <div>
            <p class="font-medium text-gray-800">${transaction.name}</p>
            <p class="text-xs text-gray-500 mt-0.5">${transaction.date} • ${transaction.time || ''}</p>
            ${transaction.recipient ? `<p class="text-xs text-gray-600 mt-0.5">To: ${transaction.recipient}</p>` : ''}
            ${transaction.sender ? `<p class="text-xs text-gray-600 mt-0.5">From: ${transaction.sender}</p>` : ''}
            ${transaction.biller ? `<p class="text-xs text-gray-600 mt-0.5">Biller: ${transaction.biller}</p>` : ''}
          </div>
          <div class="text-right">
            <p class="font-semibold ${transaction.name.includes('Received') || transaction.name.includes('Bonus') || transaction.name.includes('Add') ? 'text-green-600' : 'text-red-600'}">
              ${transaction.name.includes('Received') || transaction.name.includes('Bonus') || transaction.name.includes('Add') ? '+' : '-'}$${transaction.amount || 0}
            </p>
          </div>
        </div>
      </div>
    `;
    
    container.appendChild(div);
  });
}

// Setup all event listeners
function setupEventListeners() {
  // Menu button listeners
  document.getElementById("add-button").addEventListener("click", () => toggleForm("add-money-parent", document.getElementById("add-button")));
  document.getElementById("cash-out-button").addEventListener("click", () => toggleForm("cash-out-parent", document.getElementById("cash-out-button")));
  document.getElementById("transfer-button").addEventListener("click", () => toggleForm("transfer-money-parent", document.getElementById("transfer-button")));
  document.getElementById("bonus-button").addEventListener("click", () => toggleForm("get-bonus-parent", document.getElementById("bonus-button")));
  document.getElementById("payBill-button").addEventListener("click", () => toggleForm("pay-bill-parent", document.getElementById("payBill-button")));
  document.getElementById("transactions-button").addEventListener("click", () => {
    toggleForm("transaction-parent", document.getElementById("transactions-button"));
    displayTransactions(false);
  });
  
  // View All button
  document.getElementById("view-all").addEventListener("click", () => displayTransactions(true));
  
  // Logout button
  document.getElementById("logout-button").addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "./index.html";
  });
  
  // Reset Demo button
  document.getElementById("reset-demo-btn").addEventListener("click", () => {
    if (confirm("Reset all users to original balances? Transactions will be kept.")) {
      const originalUsers = [
        { name: "Navid Hassan", mobile: 1778548640, pin: 2002, balance: 50000 },
        { name: "Nishad Ahamed", mobile: 1742844817, pin: 2003, balance: 60000 },
        { name: "Mohammed Abrar", mobile: 1887664856, pin: 2004, balance: 75000 },
        { name: "Nazmul Hasan", mobile: 1303587830, pin: 2005, balance: 55000 }
      ];
      
      localStorage.setItem("payoooUsers", JSON.stringify(originalUsers));
      
      const userIndex = originalUsers.findIndex(u => u.mobile === currentUser.mobile);
      if (userIndex !== -1) {
        currentUser = originalUsers[userIndex];
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        updateUserBalance(currentUser.balance);
        alert("✅ Demo reset! Balance restored to original.");
      }
    }
  });
  
  // Add Money
  document.getElementById("addMoney-btn").addEventListener("click", (e) => {
    e.preventDefault();
    
    const accountNumber = document.getElementById("account-number").value.trim();
    const amount = getInputNumber("add-amount");
    const pin = getInputNumber("add-pin");
    
    if (!validateAccountNumber(accountNumber)) {
      alert("❌ Please enter a valid 11-digit account number.");
      return;
    }
    
    if (!validatePIN(pin) || pin !== currentUser.pin) {
      alert("❌ Invalid PIN.");
      return;
    }
    
    if (!validateAmount(amount)) {
      alert("❌ Please enter a valid amount.");
      return;
    }
    
    const newBalance = currentUser.balance + amount;
    updateUserBalance(newBalance);
    
    saveTransaction({
      name: "Add Money",
      amount: amount,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    
    alert(`✅ $${amount} added successfully!`);
    resetAddMoneyForm();
  });
  
  // Cash Out
  document.getElementById("withdrawMoney-btn").addEventListener("click", (e) => {
    e.preventDefault();
    
    const agentNumber = document.getElementById("agent-number").value.trim();
    const amount = getInputNumber("cash-out-amount");
    const pin = getInputNumber("cashout-pin");
    
    if (!validateAccountNumber(agentNumber)) {
      alert("❌ Please enter a valid 11-digit agent number.");
      return;
    }
    
    if (!validatePIN(pin) || pin !== currentUser.pin) {
      alert("❌ Invalid PIN.");
      return;
    }
    
    if (!validateAmount(amount)) {
      alert("❌ Please enter a valid amount.");
      return;
    }
    
    if (amount > currentUser.balance) {
      alert("❌ Insufficient balance!");
      return;
    }
    
    const newBalance = currentUser.balance - amount;
    updateUserBalance(newBalance);
    
    saveTransaction({
      name: "Cash Out",
      amount: amount,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    
    alert(`✅ $${amount} cashed out successfully!`);
    resetCashOutForm();
  });
  
  // Transfer Money
  document.getElementById("transfer-btn").addEventListener("click", (e) => {
    e.preventDefault();
    
    const recipientAccount = document.getElementById("user-account").value.trim();
    const amount = getInputNumber("transferred-amount");
    const pin = getInputNumber("transfer-pin");
    
    if (!validateAccountNumber(recipientAccount)) {
      alert("❌ Please enter a valid 11-digit account number.");
      return;
    }
    
    if (!validatePIN(pin) || pin !== currentUser.pin) {
      alert("❌ Invalid PIN.");
      return;
    }
    
    if (!validateAmount(amount)) {
      alert("❌ Please enter a valid amount.");
      return;
    }
    
    if (amount > currentUser.balance) {
      alert("❌ Insufficient balance!");
      return;
    }
    
    const recipientMobile = recipientAccount;
    
    // Check if transferring to self
    if (recipientMobile === currentUser.mobile) {
      alert("❌ You cannot transfer money to yourself!");
      return;
    }
    
    // Find recipient
    const recipient = users.find(u => u.mobile.toString() === recipientMobile); 
    if (!recipient) {
      alert("❌ Recipient account not found!");
      return;
    }
    
    // Process transfer
    const newSenderBalance = currentUser.balance - amount;
    updateUserBalance(newSenderBalance);
    updateRecipientBalance(recipientMobile, amount);
    
    // Save transaction for sender
    saveTransaction({
      name: "Transfer Money",
      amount: amount,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      recipient: recipient.name
    });
    
    // Save transaction for recipient
    const recipientTransactions = JSON.parse(localStorage.getItem(`transactions_${recipientMobile}`)) || [];
    recipientTransactions.push({
      name: "Money Received",
      amount: amount,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: currentUser.name
    });
    localStorage.setItem(`transactions_${recipientMobile}`, JSON.stringify(recipientTransactions));
    
    alert(`✅ $${amount} transferred to ${recipient.name} successfully!`);
    resetTransferForm();
  });
  
  // Pay Bill
  document.getElementById("payBill-btn").addEventListener("click", (e) => {
    e.preventDefault();
    
    const billerAccount = document.getElementById("biller-account-number").value.trim();
    const amount = getInputNumber("pay-amount");
    const pin = getInputNumber("pay-bill-pin");
    
    if (!validateAccountNumber(billerAccount)) {
      alert("❌ Please enter a valid 11-digit account number.");
      return;
    }
    
    if (!validatePIN(pin) || pin !== currentUser.pin) {
      alert("❌ Invalid PIN.");
      return;
    }
    
    if (!validateAmount(amount)) {
      alert("❌ Please enter a valid amount.");
      return;
    }
    
    if (amount > currentUser.balance) {
      alert("❌ Insufficient balance!");
      return;
    }
    
    const billerMobile = parseInt(billerAccount);
    const biller = users.find(u => u.mobile === billerMobile);
    
    // Deduct from payer
    const newBalance = currentUser.balance - amount;
    updateUserBalance(newBalance);
    
    // Add to biller if exists
    if (biller) {
      updateRecipientBalance(billerMobile, amount);
    }
    
    saveTransaction({
      name: "Pay Bill",
      amount: amount,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      biller: biller ? biller.name : "Unknown"
    });
    
    alert(`✅ Bill payment of $${amount} successful!`);
    resetPayBillForm();
  });
  
  // Get Bonus
  document.getElementById("get-bonus-btn").addEventListener("click", (e) => {
    e.preventDefault();
    
    const coupon = document.getElementById("bonus-coupon").value.trim().toUpperCase();
    const validCoupons = {
      "BONUS100": 100,
      "WELCOME50": 50,
      "PAYOOO25": 25
    };
    
    if (!coupon) {
      alert("❌ Please enter a coupon code.");
      return;
    }
    
    if (validCoupons[coupon]) {
      const bonusAmount = validCoupons[coupon];
      const newBalance = currentUser.balance + bonusAmount;
      updateUserBalance(newBalance);
      
      saveTransaction({
        name: "Get Bonus",
        amount: bonusAmount,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      
      alert(`🎉 Congratulations! You received $${bonusAmount} bonus!`);
      resetGetBonusForm();
    } else {
      alert("❌ Invalid coupon code. Try: BONUS100, WELCOME50, or PAYOOO25");
    }
  });
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", initializeApp);