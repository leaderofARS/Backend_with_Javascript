// Global state
let transactions = [];

// DOM Elements
const form = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const transactionList = document.getElementById('transaction-list');
const balanceDisplay = document.getElementById('balance');

// Transaction Constructor (Object from Chapter 8)
function createTransaction(description, amount) {
  return {
    id: Date.now(),
    description,
    amount: parseFloat(amount),
  };
}

// Add transaction to state and UI
function addTransaction(e) {
  e.preventDefault();

  const desc = descriptionInput.value.trim();
  const amt = amountInput.value.trim();

  if (desc === '' || amt === '') return;

  const transaction = createTransaction(desc, amt);
  transactions.push(transaction);
  updateUI();
  form.reset();
}

// Update the DOM with all transactions and balance
function updateUI() {
  // Clear existing list
  transactionList.innerHTML = '';

  transactions.forEach((tx) => {
    const li = document.createElement('li');
    li.textContent = `${tx.description} : ₹${tx.amount}`;
    li.classList.add(tx.amount >= 0 ? 'income' : 'expense');
    transactionList.appendChild(li);
  });

  // Update balance
  const balance = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  balanceDisplay.textContent = balance.toFixed(2);
}

// Event Listener
form.addEventListener('submit', addTransaction);
