package ca.uoit.w24csci2020ufinalproject;

import java.util.*;

public class GraphService {
    /**
     * Generate graph data based on lists of Income and Expense objects.
     * @param incomes  List of Income objects
     * @param expenses List of Expense objects
     * @return A HashMap containing graph data with keys "labels", "incomeData", and "expenseData"
     */
    public Map<String, Object> generateBarGraphData(List<Income> incomes, List<Expense> expenses) {
        Map<String, Object> graphData = new HashMap<>();

        // Extract unique months from both income and expense lists
        List<String> months = extractUniqueMonths(incomes, expenses);

        // Create lists to store the monthly income and expense data
        List<MonthlyIncomeData> incomeDataList = new ArrayList<>();
        List<MonthlyExpenseData> expenseDataList = new ArrayList<>();

        // Calculate total income and expenses for each month
        for (String month : months) {
            double monthlyIncome = incomes.stream()
                    .filter(income -> income.getMonth().equals(month))
                    .mapToDouble(Income::getTotal)
                    .sum();

            double monthlyExpense = expenses.stream()
                    .filter(expense -> expense.getMonth().equals(month))
                    .mapToDouble(Expense::getTotal)
                    .sum();

            // Create data objects for each month
            incomeDataList.add(new MonthlyIncomeData(month, monthlyIncome));
            expenseDataList.add(new MonthlyExpenseData(month, monthlyExpense));
        }

        // Prepare the graph data
        graphData.put("incomeData", incomeDataList);
        graphData.put("expenseData", expenseDataList);
        graphData.put("labels", months);

        return graphData;
    }

    /**
     * Extract unique months from lists of Income and Expense objects.
     * @param incomes  List of Income objects
     * @param expenses List of Expense objects
     * @return A list of unique months
     */
    private List<String> extractUniqueMonths(List<Income> incomes, List<Expense> expenses) {
        // Create a set to store the unique months
        Set<String> uniqueMonths = new HashSet<>();

        // Iterate through the list of incomes
        for (Income income : incomes) {
            // Add each month to the set
            uniqueMonths.add(income.getMonth());
        }

        // Iterate through the list of expenses objects
        for (Expense expense : expenses) {
            // Add each month to the set
            uniqueMonths.add(expense.getMonth());
        }

        // Convert the set of unique months to a list for maintainability
        List<String> monthsList = new ArrayList<>(uniqueMonths);

        // Sort the list to ensure months are in chronological order
        Collections.sort(monthsList);

        return monthsList;
    }
}
