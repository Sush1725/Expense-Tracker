const expenseForm = document.getElementById("expenseForm");
const expenseTable = document.querySelector("#expenseTable tbody");
const totalExpensesBox = document.getElementById("totalExpenses");

let totalExpenses = 0;

expenseForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const description = document.getElementById("description").value;
  const amount = parseFloat(document.getElementById("amount").value);

  const row = document.createElement("tr");
  row.innerHTML = `
        <td>${description}</td>
        <td>${amount.toFixed(2)}</td>
        <td><button class="delete-btn">Delete</button></td>
    `;

  expenseTable.appendChild(row);

  totalExpenses += amount;
  totalExpensesBox.textContent = totalExpenses.toFixed(2);

  expenseForm.reset();
  storeData();
});

expenseTable.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    const row = event.target.closest("tr");
    const amount = parseFloat(row.cells[1].textContent);
    row.remove();

    totalExpenses -= amount;
    totalExpensesBox.textContent = totalExpenses.toFixed(2);
    storeData();
  }
});

function storeData() {
   localStorage.setItem("data", expenseTable.innerHTML);
   localStorage.setItem("totalExpenses", totalExpenses.toFixed(2));
}


function loadData() {
    const storedExpenses = localStorage.getItem("expenses");
    const storedTotalExpenses = localStorage.getItem("totalExpenses");
  
    if (storedExpenses) {
      expenseTable.innerHTML = storedExpenses;
    }
    if (storedTotalExpenses) {
      totalExpenses = parseFloat(storedTotalExpenses);
      totalExpensesBox.textContent = totalExpenses.toFixed(2);
    }
  }
  
  loadData();


  function showData() {
    expenseTable.innerHTML = localStorage.getItem('data');
    totalExpenses.toFixed(2)=localStorage.getItem(totalExpenses)
}
showData();