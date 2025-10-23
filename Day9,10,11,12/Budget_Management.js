let transactions = get('transactions') || []; 
let savingsGoals = get('savingsGoals') || [];  

store('transactions',transactions);
store('savingsGoals',savingsGoals);
//tohave next transaction id
let nextTransactionId = 1;
//to have next goal id
let nextGoalId = 1;
//to have current goal id
let currentGoalId = null;

//This function is to update all the dynamic element when it load or refresh
function initApp() {
    updateDashboard();
    displayTransactions();
    displayGoals();
    updateChart();
    document.getElementById('transactionForm').addEventListener('submit', addTransaction);
    document.getElementById("goalModal").addEventListener('submit', addGoal);
    document.getElementById("contributionModal").addEventListener('submit', addContribution);
    document.getElementById('import').onclick=triggerFileInput;
    document.getElementById('export').onclick=()=>downloadCSV(transactions,'transactions.csv');
    document.getElementById('csvFile').addEventListener('change',handleFileImport);
}
//download the csv file
function downloadCSV(data, filename) {
    if (data.length === 0) {//to check the transaction has data
        alert('No data to export!');
        return;
    }
    const headers = Object.keys(data[0]);
    const rows = data.map(function(obj) {//to return the rows as array of array
        return headers.map(function(key) {
            return obj[key];
        });
    });
    let csvContent = headers.join(',') + '\n';
    for (let i = 0; i < rows.length; i++) {
        csvContent+=rows[i].join(',') + '\n';
    }
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });//create a blob to form csv file
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
    alert('Data exported successfully!');
}
//To trigger the input type insert
function triggerFileInput() {
    document.getElementById('csvFile').click();
}

function handleFileImport(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(e) {
        const text = e.target.result;
        const lines = text.trim().split('\n');
        
        if (lines.length < 2) {
            alert('CSV file is empty or invalid!');
            return;
        }
        
        const headers = lines[0].split(',');
        const parsedTransactions = [];

        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            const obj = {};

            for (let j = 0; j < headers.length; j++) {
                let value = values[j];

                // Convert types where needed
                if (headers[j] === 'id' || headers[j] === 'amount') {
                    value = Number(value);
                }
                obj[headers[j]] = value;
            }
            parsedTransactions.push(obj);
        }
        transactions = parsedTransactions;
        store('transactions',transactions);
        if (transactions.length > 0) {
            let maxId = 0;
            for (let i = 0; i < transactions.length; i++) {
                if (transactions[i].id > maxId) {
                    maxId = transactions[i].id;
                }
            }
            nextTransactionId = maxId + 1;
        } else {
            nextTransactionId = 1;
        }
        displayTransactions();
        updateDashboard();
        updateChart();
        alert('Transactions imported successfully! Total: ' + transactions.length);
    };
    reader.onerror = function() {
        alert('Error reading file!');
    };
    reader.readAsText(file);
    e.target.value = '';
    updateDashboard();
    displayTransactions();
    displayGoals();
    updateChart();
}

function getTotalIncome() {
    let total = 0;
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].type === 'income') {
            total = total + transactions[i].amount;
        }
    }
    return total;
}

function getTotalExpenses() {
    let total = 0;
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].type === 'expense') {
            total = total + transactions[i].amount;
        }
    }
    return total;
}

function getBalance() {
    return getTotalIncome() - getTotalExpenses();
}

function getSavingsProgress() {
    if (savingsGoals.length === 0) return 0;
    
    let totalTarget = 0;
    let totalCurrent = 0;
    
    for (let i = 0; i < savingsGoals.length; i++) {
        totalTarget = totalTarget + savingsGoals[i].target;
        totalCurrent = totalCurrent + savingsGoals[i].current;
    }
    
    if (totalTarget > 0) {
        return (totalCurrent / totalTarget) * 100;
    }
    return 0;
}
function updateDashboard() {
    const income = getTotalIncome();
    const expenses = getTotalExpenses();
    const balance = getBalance();
    const savingsProgress = getSavingsProgress();
    document.getElementById("invalue").textContent='$' + income.toFixed(2);
    document.getElementById("exvalue").textContent='$' + expenses.toFixed(2);
    document.getElementById("savevalue").textContent='$' + savingsProgress.toFixed(2);
    const bal=document.getElementById("balvalue");
    const balanceDisplay = document.getElementById('cbalance');
    balanceDisplay.textContent = '$' + balance.toFixed(2);
    bal.textContent = '$' + balance.toFixed(2);

    if (balance >= 0) {
        balanceDisplay.style.color = '#4f46e5';
        bal.style.color = '#4f46e5';
    } else {
        balanceDisplay.style.color = '#ef4444';
        bal.style.color = '#ef4444';
    }
}
function addTransaction(e) {
    e.preventDefault();
    const form = e.target;
    const type = form.querySelector('input[name="type"]:checked').value;
    const amount = parseFloat(form.querySelector('input[type="number"]').value);
    const category = form.querySelector('select').value;
    const date = form.querySelector('input[type="date"]').value;
    const description = form.querySelector('input[type="text"]').value;
    if (!amount || !category || !date) {
        alert('Please fill in all required fields');
        return;
    }
    const newTransaction = {
        id: nextTransactionId,
        type: type,
        amount: amount,
        category: category,
        date: date,
        description: description || getCategoryLabel(category)
    };
    transactions.push(newTransaction);
    nextTransactionId = nextTransactionId + 1;
    form.reset();
    store('transactions',transactions);
    updateDashboard();
    displayTransactions();
    updateChart();  
    alert('Transaction added successfully!');
}
function displayTransactions() {
    transactions=get('transactions');
    const transactionList = document.querySelector('.transaction-list');
    
    if (!transactionList) return;
    
    // Sort transactions by date (newest first)
    let sortedTransactions = [];
    for (let i = 0; i < transactions.length; i++) {
        sortedTransactions.push(transactions[i]);
    }
    sortedTransactions.sort(function(a, b) {
        return new Date(b.date) - new Date(a.date);
    });
    
    // Build HTML
    let html = '';
    for (let i = 0; i < sortedTransactions.length; i++) {
        const t = sortedTransactions[i];
        const amountClass = t.type === 'income' ? 'amount-income' : 'amount-expense';
        const sign = t.type === 'income' ? '+' : '-';
        
        html = html + `
            <div class="transaction-item">
                <div class="transaction-info">
                    <div class="transaction-category">${t.description}</div>
                    <div class="transaction-date">${formatDate(t.date)}</div>
                </div>
                <div class="transaction-amount ${amountClass}">
                    ${sign}$${t.amount.toFixed(2)}
                </div>
                <button class="btn btn-danger btn-sm" onclick="deleteTransaction(${t.id})">Delete</button>
            </div>
        `;
    }
    
    if (html === '') {
        html = '<div style="text-align: center; padding: 2rem; color: var(--text-secondary);">No transactions yet. Add your first transaction!</div>';
    }
    
    transactionList.innerHTML = html;
}

function deleteTransaction(id) {
    if (confirm('Are you sure you want to delete this transaction?')) {
        let newTransactions = [];
        for (let i = 0; i < transactions.length; i++) {
            if (transactions[i].id !== id) {
                newTransactions.push(transactions[i]);
            }
        }
        transactions = newTransactions;
        store('transactions',transactions);
        updateDashboard();
        displayTransactions();
        updateChart();
        
        alert('Transaction deleted');
    }
}

function addGoal(e) {
    e.preventDefault();
    
    const form = e.target;
    const name = form.querySelector('input[type="text"]').value;
    const target = parseFloat(form.querySelector('input[type="number"]').value);
 
    
    if (!name || !target || target <= 0) {
        alert('Please provide a valid goal name and target amount');
        return;
    }

    const newGoal = {
        id: nextGoalId,
        name: name,
        target: target,
        current: 0,
        achieved: false
    };

    savingsGoals.push(newGoal);
    nextGoalId = nextGoalId + 1;
    form.reset();
    closeGoalModal();
    store('savingsGoals',savingsGoals);
    
    displayGoals();
    updateDashboard();
    alert('Savings goal created successfully!');
}

function displayGoals() {
    savingsGoals=get('savingsGoals');
    const goalsGrid = document.querySelector('.goals-grid');
    
    if (!goalsGrid) return;
    
    let html = '';
    for (let i = 0; i < savingsGoals.length; i++) {
        const g = savingsGoals[i];
        const progress = (g.current / g.target) * 100;
        const isAchieved = g.achieved || g.current >= g.target;
        const borderStyle = isAchieved ? 'style="border: 2px solid var(--success);"' : '';
        
        html = html + `
            <div class="goal-card" ${borderStyle}>
                <div class="goal-header">
                    <div class="goal-name">
                        ${g.name}
                        ${isAchieved ? '<span class="achieved-badge">✓ Achieved</span>' : ''}
                    </div>
                </div>
                <div class="goal-amounts">
                    <span class="current-amount">$${g.current.toFixed(2)}</span>
                    <span class="target-amount">of $${g.target.toFixed(2)}</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${Math.min(progress, 100)}%"></div>
                </div>
                <div class="progress-percentage">
                    ${Math.min(progress, 100).toFixed(0)}% Complete ${isAchieved ? '🎉' : ''}
                </div>
                ${!isAchieved ? `
                    <button class="btn btn-success btn-sm" style="width: 100%;" 
                            onclick="openContributionForGoal(${g.id})">
                        + Add Contribution
                    </button>
                ` : `
                    <button class="btn btn-danger btn-sm" style="width: 100%;" 
                            onclick="deleteGoal(${g.id})">
                        Delete Goal
                    </button>
                `}
            </div>
        `;
    }
    
    goalsGrid.innerHTML = html;
}
function openContributionForGoal(goalId) {
    currentGoalId = goalId;
    openContributionModal();
}

function addContribution(e) {
    e.preventDefault();
    
    if (!currentGoalId) return;

    const form = e.target;
    const amount = parseFloat(form.querySelector('input[type="number"]').value);
    const balance = getBalance();
    if (!amount || amount <= 0) {
        alert('Please enter a valid contribution amount');
        return;
    }
    
    if (amount > balance) {
        alert('Insufficient balance! Available balance: $' + balance.toFixed(2));
        return;
    }
    let goal = null;
    for (let i = 0; i < savingsGoals.length; i++) {
        if (savingsGoals[i].id === currentGoalId) {
            goal = savingsGoals[i];
            break;
        }
    }
    
    if (!goal) return;
    

    let correct;
    if (goal.current + amount > goal.target) {
        const userConfirm = confirm(
            '- Click OK to add only the needed amount ($' + (goal.target - goal.current).toFixed(2) + ')\n' +
            '- Click Cancel to add the full amount anyway'
        );
        if (userConfirm) {
        correct=goal.target-goal.current;
            goal.current = goal.target;
        } else {
            correct=amount
            goal.current = goal.current + amount;
        }
    } else {
        goal.current = goal.current + amount;
        correct=amount
    }
    
    if (goal.current >= goal.target) {
        goal.achieved = true;
        alert('Congratulations! You have achieved your "' + goal.name + '" goal!');
    }
    const newTransaction = {
        id: nextTransactionId,
        type: 'expense',
        amount:correct,
        category: 'savings',
        date: new Date().toISOString().split('T')[0],
        description: 'Contribution to ' + goal.name
    };
    transactions.push(newTransaction);
    nextTransactionId = nextTransactionId + 1;
    store('transactions',transactions);    
    form.reset();
    closeContributionModal();
    currentGoalId = null;

    updateDashboard();
    displayTransactions();
    displayGoals();
    updateChart();
}

function deleteGoal(id) {
    if (confirm('Are you sure you want to delete this savings goal?')) {
        let newGoals = [];
        for (let i = 0; i < savingsGoals.length; i++) {
            if (savingsGoals[i].id !== id) {
                newGoals.push(savingsGoals[i]);
            }
        }
        savingsGoals = newGoals;
        store('savingsGoals',savingsGoals);
        displayGoals();
        updateDashboard();
        
        alert('Savings goal deleted');
    }
}

function updateChart() {
    transactions=get('transactions');
    let categories = ["Salary","Food","Rent","Utilities","Entertainment","Transport","Saving"];
    let amounts = [0,0,0,0,0,0,0];
    for(let i=0;i<transactions.length;i++){
        if(transactions[i].type==='expense'){
        let index=categories.findIndex(c=>c===transactions[i].category);
            amounts[index]+=transactions[i].amount;
        }
    }

    const data = [{
        x: amounts,
        y: categories,
        type: "bar",
        orientation: "h",
        marker: { 
            color: "rgba(99, 102, 241, 0.7)",
            line: {
                color: 'rgba(99, 102, 241, 1)',
                width: 1.5
            }
        }
    }];
    
    const layout = {
        title: "Expense Breakdown by Category",
        xaxis: { title: "Amount ($)" },
        yaxis: { title: "" },
        margin: { l: 150, r: 50, t: 50, b: 50 },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'
    };
    
    Plotly.newPlot("myPlot", data, layout, { responsive: true });
}

function getCategoryLabel(category) {
    const labels = {
        'salary': 'Monthly Salary',
        'food': 'Food & Groceries',
        'rent': 'Rent Payment',
        'utilities': 'Utilities',
        'entertainment': 'Entertainment',
        'transport': 'Transportation',
        'savings': 'Savings Contribution'
    };
    
    if (labels[category]) {
        return labels[category];
    } else {
        return category.charAt(0).toUpperCase() + category.slice(1);
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
}

function toggle() {
    const body = document.body;
    
    if (body.classList.contains("light")) {
        body.classList.remove("light");
        body.classList.add("dark");
    } else {
        body.classList.remove("dark");
        body.classList.add("light");
    }
}

function openGoalModal() {
    document.getElementById('goalModal').classList.add('active');
}

function closeGoalModal() {
    document.getElementById('goalModal').classList.remove('active');
}

function openContributionModal() {
    document.getElementById('contributionModal').classList.add('active');
}

function closeContributionModal() {
    document.getElementById('contributionModal').classList.remove('active');
}

window.onclick = function(event) {
    const goalModal = document.getElementById('goalModal');
    const contributionModal = document.getElementById('contributionModal');
    
    if (event.target === goalModal) {
        closeGoalModal();
    }
    if (event.target === contributionModal) {
        closeContributionModal();
    }
}
function store(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function get(key) {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
}
initApp();