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

document.getElementById("add-btn").addEventListener("click", function () {
  const desc = document.getElementById("desc").value;
  const amt = document.getElementById("amount").value;
  addExpense(desc, amt);

  document.getElementById("desc").value = "";
  document.getElementById("amount").value = "";
});
