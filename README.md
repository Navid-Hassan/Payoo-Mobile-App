# 🏦 Payooo - Bank Payment System  
**Capstone Project 2 - University Project**

A fully functional bank payment system web application with multi-user support, transaction history, and localStorage database.

---

## 👥 **Team Members**
- **Navid Hassan** (Project Lead)
- Nishad
- Abrar  
- Nazmul

---

## 🚀 **Live Demo**
[Add your live demo link here if deployed]

---

## ✨ **Features**

### **1. Multi-User Authentication**
- 4 different users with unique credentials
- Individual balances and transaction history
- Secure PIN-based login

### **2. Banking Operations**
- **Add Money** - Deposit funds from bank account
- **Cash Out** - Withdraw money via agent
- **Transfer Money** - Send money to other users
- **Pay Bill** - Pay utility bills
- **Get Bonus** - Redeem coupon codes for bonus money

### **3. Database Integration**
- Uses **localStorage** as persistent database
- Each user has separate:
  - Balance tracking
  - Transaction history
  - Personal data

### **4. User Interface**
- Clean, modern design with Tailwind CSS
- Responsive layout
- Real-time balance updates
- Form validation and auto-reset
- Transaction history with timestamps

---

## 🛠️ **Technologies Used**
- **HTML5** - Structure
- **CSS3/Tailwind CSS** - Styling
- **JavaScript (ES6+)** - Functionality
- **localStorage API** - Database
- **DaisyUI** - UI Components

---

## 📁 **Project Structure**

payooo-bank-system/
│
├── index.html # Login page
├── home.html # Main dashboard
├── script.js # Login logic
├── home.js # Dashboard logic
├── README.md # This file
│
├── assets/ # Images and icons
│ ├── Group.png
│ ├── wallet1.png
│ ├── send1.png
│ └── ...
│
└── (optional files)


---

## 🔐 **Login Credentials**

| User | Mobile Number | PIN | Initial Balance |
|------|---------------|-----|-----------------|
| Navid Hassan | 1778548640 | 2002 | $50,000 |
| Nishad | 1778548641 | 2003 | $60,000 |
| Abrar | 1778548642 | 2004 | $75,000 |
| Nazmul | 1778548643 | 2005 | $55,000 |

---

## 🎮 **How to Use**

### **1. Login**
- Open `index.html` in browser
- Enter mobile number and PIN
- Click "Login"

### **2. Dashboard Features**
- **Add Money**: Select bank, enter account details, amount, and PIN
- **Cash Out**: Enter agent number, amount, and PIN  
- **Transfer Money**: Enter recipient account, amount, and PIN
- **Pay Bill**: Select payment method, enter details, and PIN
- **Get Bonus**: Use coupon codes: `BONUS100`, `WELCOME50`, `PAYOOO25`
- **Transactions**: View your transaction history

### **3. Demo Reset**
- Click "Reset Demo" button to restore original balances
- Keeps transaction history intact

---

## 🔧 **Setup Instructions**

1. **Clone or Download** the project
2. **No installation needed** - runs directly in browser
3. Open `index.html` in any modern browser
4. Start using with provided credentials

---

## 🎯 **Unique Features**

### **✅ Database Implementation**
- Each user's data persists across sessions
- Transactions are saved and retrievable
- Balance updates in real-time

### **✅ Multi-User Support**
- Separate accounts for team members
- Isolated transactions and balances
- Personalized greetings

### **✅ Form Management**
- Auto-reset after each operation
- Input validation (11-digit accounts, valid amounts)
- PIN protection for all transactions

### **✅ UI/UX Enhancements**
- Balance update animations
- Transaction icons based on type
- Responsive design
- Visual feedback for all actions

---

## 📝 **What Makes This Project Unique**

1. **Real Database Usage** - Not just frontend simulation
2. **Team Collaboration Ready** - Built for 4 users to work together
3. **Production-like Features** - Form validation, error handling, data persistence
4. **Professional Polish** - Animations, responsive design, user feedback

---

## 🐛 **Known Issues**
- None - All features tested and working

---

## 📈 **Future Enhancements**
- [ ] Firebase integration for cloud storage
- [ ] Email/SMS notifications
- [ ] Transaction reports (PDF export)
- [ ] Admin dashboard
- [ ] Real-time chat support

---

## 📄 **License**
University Project - Capstone 2  
© 2024 Payooo Team

---

## 🙏 **Acknowledgments**
- Thanks to our course instructor for guidance
- Team members for collaboration
- Online resources for learning materials