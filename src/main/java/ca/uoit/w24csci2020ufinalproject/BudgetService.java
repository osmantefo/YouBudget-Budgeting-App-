package ca.uoit.w24csci2020ufinalproject;

import java.util.List;

public class BudgetService {
    // Function to calculate the total income
    public double calculateTotalIncome(List<Income> incomes) {
        double totalIncome = 0.0;
        for (Income income : incomes) {
            totalIncome += income.getTotal();
        }
        return totalIncome;
    }

    // Function to calculate the total expenses
    public double calculateTotalExpenses(List<Expense> expenses) {
        double totalExpenses = 0.0;
        for (Expense expense : expenses) {
            totalExpenses += expense.getTotal();
        }
        return totalExpenses;
    }

    // Method to determine the financial status message based on income-to-expense ratio
    public String determineStatusMessage(double totalIncome, double totalExpenses) {
        if (totalIncome == 0 && totalExpenses == 0) {
            return "No data provided";
        }

        // Calculate the income-to-expense ratio
        double ratio = totalIncome / totalExpenses;

        if (ratio >= 1.1) {
            return "Optimal: Your income is well-balanced with your expenses.";
        } else if (ratio >= 0.9) {
            return "Stable: Your income and expenses are fairly aligned.";
        } else {
            return "Suboptimal: Your expenses exceed your income.";
        }
    }
}