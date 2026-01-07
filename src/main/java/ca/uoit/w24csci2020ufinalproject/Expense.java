package ca.uoit.w24csci2020ufinalproject;

public class Expense {
    // Declaring variables
    private String month;
    private String type;
    private double total;

    // Default constructor
    public Expense() {
        this.month = "";
        this.type = "";
        this.total = 0.0;
    }

    // Parameterized constructor
    public Expense(String month, String type, double total){
        this.month = month;
        this.type = type;
        this.total = total;
    }

    // Getters
    public String getMonth(){
        return month;
    }

    public String getType() { return type; }

    public double getTotal(){
        return total;
    }

    // Setters
    public void setMonth(String month) {
        this.month = month;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setTotal(double total) {
        this.total = total;
    }
}