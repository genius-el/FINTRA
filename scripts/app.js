let transactions = [];

const form = document.getElementById("transaction-form");
const transactionsList = document.getElementById("transactions");
const balanceEl = document.getElementById("balance");

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const description = document.getElementById("description").value;
    const amount = Number(document.getElementById("amount").value);
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;

    const transaction = {
        id: Date.now(),
        description,
        amount,
        category,
        date,
    };

    transactions.push(transaction);

    form.reset();
    renderTransactions();
    updateBalance();
});

function renderTransactions() {
    transactionsList.innerHTML = "";

    transactions.forEach((t) => {
        const li = document.createElement("li");

        li.innerHTML = `
        <span>${t.description} - $${t.amount} (${t.category})</span>
        <button class="delete-btn" onclick="deleteTransaction(${t.id})">Delete</button>
        `;

        transactionsList.appendChild(li);
    });
}

function deleteTransaction(id) {
    transactions = transactions.filter((t) => t.id !== id);
    renderTransactions();
    updateBalance();
}

function updateBalance() {
    const total = transactions.reduce((sum, t) => {
        if (t.category === "income") {
            return sum + t.amount;
        } else {
            return sum - t.amount;
        }
    }, 0);

    balanceEl.textContent = `$${total}`
}