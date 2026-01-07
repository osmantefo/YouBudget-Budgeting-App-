import {addTableRow, clearTable} from "./tables.js";
import {formatInteger} from "./utils.js";

// Function to get data from the income or expenses table
function getTableData(tableId) {
    const tableBody = document.getElementById(tableId).querySelector('tbody');
    const tableRows = tableBody.querySelectorAll('tr');
    const dataArray = [];

    // Iterate through the table rows
    tableRows.forEach(row => {
        // Get the table selectors and input field
        const monthSelection = row.querySelector('select[id="monthDropdown"]');
        const typeSelection = row.querySelector('select[id="typeDropdown"]');
        const totalInput = row.querySelector('input[type="number"]');

        // Extract the values from the selectors and input field
        const rowData = {
            month: monthSelection.value, // Get the dropdown menu value
            type: typeSelection.value, // Get the dropdown menu value
            total: parseFloat(totalInput.value), // Convert the total to a float
        };

        // Add the row data to the `dataArray` if valid
        if (rowData.month && rowData.type && !isNaN(rowData.total)) {
            dataArray.push(rowData);
        }
    });

    return dataArray;
}

/**
 * Function to handle budget submissions
 * Gets the data from the income and expenses tables
 * Sends a JSON payload of the table data to the server
 * Updates the UI based on the server response
 * **/
function handleBudgetSubmission() {
    const apiUrl = 'http://localhost:8080/w24-csci2020u-final-project-lofters-purai-osman-daniel-1.0-SNAPSHOT/api/submit';

    // Get data from the income and expenses table
    const incomeData = getTableData('incomeTable');
    const expenseData = getTableData('expensesTable');
    const payload = {
        income: incomeData,
        expenses: expenseData,
    };

    // Check if either the income or expenses data array is empty
    if (incomeData.length === 0 && expenseData.length === 0) {
        alert('Error: The income and expenses tables are empty.');
    } else {
        // Send the payload to the server
        console.log('Payload sent to the server: ' + JSON.stringify(payload));
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload), // Convert payload to JSON
        })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('Response status was not ok');
                }

                return response.json();
            })
            .then(data => {
                console.log('Data retrieved from', apiUrl + ':');
                console.log(data);
                updateFinancialSummary(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }
}

// Function to update the financial summary based on the server response
function updateFinancialSummary(data) {
    // Convert the income and expense total to a number and format it using 'formatInteger'
    const incomeTotalFormatted = formatInteger(parseFloat(data.totalIncome.toFixed(2)));
    const expenseTotalFormatted = formatInteger(parseFloat(data.totalExpenses.toFixed(2)));

    // Display the income total
    const incomeTotalElement = document.getElementById('incomeTotal');
    incomeTotalElement.textContent = `Income Total: $${incomeTotalFormatted}`;

    // Display the expense total
    const expenseTotalElement = document.getElementById('expenseTotal');
    expenseTotalElement.textContent = `Expense Total: $${expenseTotalFormatted}`;

    // Display the status message and change its color based on the status
    const statusMessageElement = document.getElementById('statusMessage');
    statusMessageElement.innerHTML = `Status: <span id="statusMessageText">${data.statusMessage}</span>`;

    // Get the inner status message span element
    const statusMessageTextElement = statusMessageElement.querySelector('#statusMessageText');

    // Determine the colour of the status message based on the status
    if (data.statusMessage.includes('Optimal')) {
        statusMessageTextElement.style.color = 'green'; // Set the colour to green for an Optimal status
    } else if (data.statusMessage.includes('Stable')) {
        statusMessageTextElement.style.color = 'orange'; // Set the colour to orange for a Stable status
    } else if (data.statusMessage.includes('Suboptimal')) {
        statusMessageTextElement.style.color = 'red'; // Set the colour to red for a Suboptimal status
    }

    // Update the bar graph if data is available
    if (data.graphData.incomeData && data.graphData.expenseData) {
        updateBarGraph(data.graphData.incomeData, data.graphData.expenseData);
    } else {
        console.error("Data for income and expenses is not available.");
    }
}

// Function to create the bar graph
function updateBarGraph(incomeData, expenseData) {
    // Get the canvas context from the 'BarGraph' element
    const canvasContext = document.getElementById("barGraph").getContext("2d");

    // Destroy any existing bar graph instance to avoid duplication
    if (window.barGraph && typeof window.barGraph.destroy === 'function') {
        window.barGraph.destroy();
    }

    // Create a new instance of the Chart class
    window.barGraph = new Chart(canvasContext, {
        type: "bar",
        // Provide the data for the chart
        data: {
            // Set the labels for each data point based on the months in 'incomeData'
            labels: incomeData.map(entry => entry.month),
            // Define the income and expenses datasets
            datasets: [
                {
                    label: "Income",
                    backgroundColor: "rgba(0, 123, 255, 0.2)",
                    borderColor: "rgba(0, 123, 255, 1)",
                    borderWidth: 1,
                    data: incomeData.map(entry => entry.total)
                },
                {
                    label: "Expenses",
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    borderColor: "rgba(255, 99, 132, 1)",
                    borderWidth: 1,
                    data: expenseData.map(entry => entry.total)
                }
            ]
        },
        options: {
            // Configure the y-axis
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Month' // Label for the x-axis
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Total ($)' // Label for the y-axis
                    }
                }
            }
        }
    });
}

// Function to set initial income and expense totals to 0 on page load
function initializeFinancialSummary() {
    // Get the elements for income and expense totals
    const incomeTotalElement = document.getElementById('incomeTotal');
    const expenseTotalElement = document.getElementById('expenseTotal');

    // Set the income and expense totals to 0
    incomeTotalElement.textContent = `Income Total: $0`;
    expenseTotalElement.textContent = `Expense Total: $0`;

    // Set the initial status message
    const statusMessageElement = document.getElementById('statusMessage');
    statusMessageElement.innerHTML = 'Status: <span>Input your income and expenses to determine your status</span>';

    // Set the bar graph
    const initialBarGraphData = generateInitialBarGraphData();
    updateBarGraph(initialBarGraphData.incomeData,initialBarGraphData.expenseData);
}

// Function to generate initial bar graph data on page load
function generateInitialBarGraphData() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const zeroData = months.map(month => ({ month, total: 0 }));

    return {
        incomeData: zeroData,
        expenseData: zeroData
    };
}

// Event listeners to initialize the UI on page load
document.addEventListener('DOMContentLoaded', () => {
    // Event listener for an "Add Income Row" button click
    document.getElementById('addIncomeRowButton').addEventListener('click', () => addTableRow("incomeTable"));

    // Event listener for an "Add Expenses Row" button click
    document.getElementById('addExpensesRowButton').addEventListener('click', () => addTableRow("expensesTable"));

    // Event listener for a "Submit" button click
    document.getElementById('submitButton').addEventListener('click', handleBudgetSubmission);

    // Event listener for a "ClearIncomeTable" button click
    document.getElementById('clearIncomeTableButton').addEventListener('click', () => clearTable('incomeTable'));

    // Event listener for a "ClearExpensesTable" button click
    document.getElementById('clearExpensesTableButton').addEventListener('click', () => clearTable('expensesTable'));

    // Event listener to initialize the financial summary
    window.addEventListener('DOMContentLoaded', initializeFinancialSummary);
});
