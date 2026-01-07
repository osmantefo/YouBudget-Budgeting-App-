# **YouBudget (Budgeting App)**

## **Project Information**
YouBudget is a budgeting app that allows users to track their income and expenses, providing a snapshot of their financial status and a monthly summary of their transactions. The user can add rows to an "Income" and "Expenses" table to input the month, type, and total amount associated with each transaction. When the user clicks the "Submit" button at the bottom of the page, a financial summary appears, displaying their total income and expenses, a status message based on their income-to-expense ratio, and a bar graph showing their monthly transactions.

Group Members: Reshawn Lofters, Jonathan Purai, Meron Daniel, Abdellatif Osman
This project was completed as part of a team-based academic course.
The original repository is private due to course policies.

## Tech Stack
- Frontend: HTML, CSS, JavaScript
- Visualization: Chart.js

### **Demo**
![YouBudget](client/images/youbudget.png)
[Watch the YouBudget demo here](https://drive.google.com/file/d/177VxU08gQgQExvjvuegVrMTbhwghmo-C/view?usp=sharing)

### **Implementation Details**
- Users can select a transaction month and type using a dropdown menu for ease of use.
- Users can remove a specific row from a table or all of the rows in a table with a single button for ease of use.
- A "Learn More" button is included in the homepage header to direct users to the official Ontario Tech University budgeting resource page to learn more about budgeting.
- Currency formatting is implemented for user readability.
- For the total amount inputs in a table, the user has to enter a number greater than zero for practicality.
- Users are alerted if they try to submit an empty budget for maintainability.
- Users are alerted if they try to clear a table that is already empty for maintainability.
- Modules are used in JavaScript files for function reliability.
- Variables are used in the CSS file for reliability and maintainability.

### Personal Contributions
- Designed and implemented core transaction logic for income and expense tracking
- Developed JavaScript modules to manage table state, validation, and calculations
- Implemented input validation and user alerts to handle empty submissions and invalid values
- Designed the general UI and input fields for user information

## **How to Run**
### Step 1:
- Clone the repository:
```bash
git clone 
```
### Step 2:
- Navigate to the directory where the repository is stored
- Can be completed through Windows File Explorer or the Command Prompt, as shown:
```bash
cd [folder path]
```
### Step 3:
- Once you have navigated to the main folder, you will have to navigate to the sub-folders to reach and run the index.html file
- This can be done with Windows File Explorer or the terminal, as shown:
```bash
cd client
```
- Then, open the index.html file, which can also be done using the terminal by typing in the name of the file:
```bash
index.html
```
### Step 4:
- You will be presented with the application homepage, which includes the income and expenses table to input transactions into by clicking the "Add Row" button.
- The "Income" and "Expenses" table inputs include a month, type, total amount of a transaction, and a button to remove a row.
- When the month or type input is clicked, a dropdown menu will appear for ease of use.

### Step 5:
- When you are ready to check your financial summary, click the "Submit" button at the bottom of the homepage. If you want to delete all the rows of the "Income" or "Expenses" table, you can click the respective clear button beside the "Submit" button.
- If you want to learn more about budgeting, you can click the "Learn More" button in the homepage header, which will take you to the official Ontario Tech University budgeting resource page.

## **Other Resources**

- [Chart.js](https://www.chartjs.org/): Used for creating the bar graph and visualizations in the application.

- [Ontario Tech University Bugeting Resource](https://safa.ontariotechu.ca/resources/budgeting.php): Used for directing users to learn more about budgeting.
