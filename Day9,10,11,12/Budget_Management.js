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
        document.getElementById('transactionForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Transaction added! (This is a demo - integrate with your JavaScript logic)');
        });
        const xArray = [55, 49, 44, 24, 15,20];
const yArray = ["Salary ", "Food ", "Rent ", "Utilities ", "Entertainment ","Transport"];

const data = [{
  x:xArray,
  y:yArray,
  type:"bar",
  orientation:"h",
  marker: {color:"rgba(255,0,0,0.6)"}
}];

const layout = {title:"Expense Bar Chart"};

Plotly.newPlot("myPlot", data, layout);