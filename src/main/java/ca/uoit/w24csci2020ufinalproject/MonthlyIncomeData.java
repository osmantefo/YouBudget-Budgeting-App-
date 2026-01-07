package ca.uoit.w24csci2020ufinalproject;

class MonthlyIncomeData {
    private final String month;
    private final double total;

    // Parameterized constructor
    public MonthlyIncomeData(String month, double total) {
        this.month = month;
        this.total = total;
    }

    // Getter and setter
    public String getMonth() {
        return month;
    }

    public double getTotal() {
        return total;
    }
}