package ca.uoit.w24csci2020ufinalproject;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

/**
 * The APIFormatter class is the entry point for handling client requests.
 * It parses incoming JSON payloads and converts them into lists of Income and Expense objects.
 * It calculates total income and expenses using the BudgetService class
 * It determines the financial status message based on the ratio of income to expenses.
 * It also generates bar graph data for visual comparison using the GraphService class.
 * Finally, it constructs the response and sends it back to the client in JSON format.
 */
@Path("/submit")
public class APIFormatter {
    // Create objects of the service classes
    private final BudgetService budgetService = new BudgetService();
    private final GraphService graphService = new GraphService();

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response submit(String body) {
        // Reject the data if it is empty
        if (body.isEmpty()) {
            return Response.status(400).entity("No data passed in the body.").build();
        }

        System.out.println("Received payload: " + body);

        // Parse the body of the request and convert it to 'Income' and 'Expense' lists
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JSONObject jsonObject = new JSONObject(body);
            JSONArray incomeArray = jsonObject.getJSONArray("income");
            JSONArray expenseArray = jsonObject.getJSONArray("expenses");

            // Create a list of incomes from the payload
            List<Income> incomes = new ArrayList<>();
            for (int i = 0; i < incomeArray.length(); i++) {
                JSONObject incomeObj = incomeArray.getJSONObject(i);
                Income income = new Income();
                income.setMonth(incomeObj.getString("month"));
                income.setType(incomeObj.getString("type"));
                income.setTotal(incomeObj.getDouble("total"));
                incomes.add(income);
            }

            // Create list of expenses from the payload
            List<Expense> expenses = new ArrayList<>();
            for (int i = 0; i < expenseArray.length(); i++) {
                JSONObject expenseObj = expenseArray.getJSONObject(i);
                Expense expense = new Expense();
                expense.setMonth(expenseObj.getString("month"));
                expense.setType(expenseObj.getString("type"));
                expense.setTotal(expenseObj.getDouble("total"));
                expenses.add(expense);
            }

            // Calculate the income and expense totals
            double totalIncome = budgetService.calculateTotalIncome(incomes);
            double totalExpenses = budgetService.calculateTotalExpenses(expenses);

            // Determine the status message based on the income-to-expense ratio
            String statusMessage = budgetService.determineStatusMessage(totalIncome, totalExpenses);

            // Generate data for the bar graph
            Map<String, Object> graphData = graphService.generateBarGraphData(incomes, expenses);

            // Prepare the response data to be sent to the client
            Map<String, Object> responseData = new HashMap<>();
            responseData.put("totalIncome", totalIncome);
            responseData.put("totalExpenses", totalExpenses);
            responseData.put("statusMessage", statusMessage);
            responseData.put("graphData", graphData);

            // Convert the response data to JSON and send it to the client
            String jsonResponse = objectMapper.writeValueAsString(responseData);

            System.out.println("JSON response: " + jsonResponse);
            return Response.status(200).entity(jsonResponse).build();

        } catch (Exception e) {
            System.out.println("Exception caught.");
            return Response.status(400).entity("An error occurred while processing the request: " + e.getMessage()).build();
        }
    }
}
