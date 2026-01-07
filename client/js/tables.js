// Function to add a table row to either the income or expenses table
export function addTableRow(tableId) {
    // Get the table body element
    const tableBody = document.getElementById(tableId).getElementsByTagName("tbody")[0];

    // Create a new table row
    const newTableRow = document.createElement("tr");

    // Generate a unique key for the new row
    const rowKey = Math.random().toString(36).substring(7);

    // Set the key attribute
    newTableRow.setAttribute("key", rowKey);

    // Create a dropdown menu for the month input
    const monthDropdown = `
        <select id="monthDropdown">
            <option value="">Select</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
        </select>
    `;

    // Create a dropdown menu for the type input of the income table
    const incomeTypeDropdown = `
        <select id="typeDropdown">
            <option value="">Select</option>
            <option value="Salary">Salary</option>
            <option value="Interest">Interest</option>
            <option value="Refund">Refund</option>
            <option value="Dividends">Dividends</option>
            <option value="Pension">Pension</option>
            <option value="Bonus">Bonus</option>
        </select>
    `;

    // Create a dropdown menu for the type input of the expenses table
    const expenseTypeDropdown = `
        <select id="typeDropdown">
            <option value="">Select</option>
            <option value="Groceries">Groceries</option>
            <option value="Restaurants">Restaurants</option>
            <option value="Personal Care">Personal Care</option>
            <option value="Clothing">Clothing</option>
            <option value="Subscriptions">Subscriptions</option>
            <option value="Technology">Technology</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Donations">Donations</option>
            <option value="Transportation">Transportation</option>
        </select>
    `;

    // Create the HTML structure for the new row based on the table id
    if (tableId === 'incomeTable') {
        newTableRow.innerHTML = generateTableRowHTML(monthDropdown, incomeTypeDropdown);
    } else if (tableId === 'expensesTable') {
        newTableRow.innerHTML = generateTableRowHTML(monthDropdown, expenseTypeDropdown);
    }

    // Append the new row to the table body
    tableBody.appendChild(newTableRow);

    console.log('Row added to ' + tableId + '.');

    // Attach an event listener to the remove row button
    const removeRowButton = newTableRow.querySelector('button');
    removeRowButton.addEventListener('click', () => removeRow(tableId, rowKey));
}

// Function to generate table row html based on the table
function generateTableRowHTML(monthDropdown, typeDropdown) {
    return `
        <td>${monthDropdown}</td>
        <td>${typeDropdown}</td>
        <td><input type="number" placeholder="total" min="1"/></td>
        <td><button id="removeRowButton"">Remove</button></td>
    `;
}

// Function to remove a row from a table
export function removeRow(tableId, rowKey) {
    // Find the table row with the key attribute
    const rowToRemove = document.querySelector(`tr[key="${rowKey}"]`);

    // Remove the row if found
    if (rowToRemove) {
        rowToRemove.remove();
        console.log('Row removed from ' + tableId + '.')
    } else {
        console.log('Row not found ' + tableId + '.')
    }
}

// Function to clear a table
export function clearTable(tableId) {
    // Get the table body element
    const tableBody = document.getElementById(tableId).getElementsByTagName("tbody")[0];

    if (tableBody.innerHTML !== "") {
        // Remove all table rows
        tableBody.innerHTML = "";
        console.log(tableId + " cleared.");
    } else {
        alert('Error: ' + tableId + " is already empty.")
    }
}
