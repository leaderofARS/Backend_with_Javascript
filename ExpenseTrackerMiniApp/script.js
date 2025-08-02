// Chapter 8: Class with this keyword
class Expense {
  constructor(description, amount) {
    this.description = description;
    this.amount = parseFloat(amount);
    this.id = Date.now(); // unique ID for deletion
  }

  getHTML() {
    return `
      <div class="expense-item" data-id="${this.id}">
        <span>${this.description} - ₹${this.amount}</span>
        <button onclick="deleteExpense(${this.id})">❌</button>
      </div>
    `;
  }
}

// Chapter 7: Function and Scope
let expenses = [];

function addExpense(description, amount) {
  if (!description || !amount || amount <= 0) {
    alert("Please enter valid description and amount.");
    return;
  }

  const expense = new Expense(description, amount);
  expenses.push(expense);
  updateDOM();
}

function deleteExpense(id) {
  expenses = expenses.filter(exp => exp.id !== id);
  updateDOM();
}

// Chapter 9: DOM Manipulation
function updateDOM() {
  const expensesDiv = document.getElementById("expenses");
  const totalEl = document.getElementById("total");

  expensesDiv.innerHTML = "";
  let total = 0;

  expenses.forEach(exp => {
    expensesDiv.innerHTML += exp.getHTML();
    total += exp.amount;
  });

  totalEl.textContent = total.toFixed(2);
}

// Event Listener for Add Button
document.getElementById("add-btn").addEventListener("click", function () {
  const desc = document.getElementById("desc").value;
  const amt = document.getElementById("amount").value;
  addExpense(desc, amt);

  // Clear inputs
  document.getElementById("desc").value = "";
  document.getElementById("amount").value = "";
});
