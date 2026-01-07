package ca.uoit.w24csci2020ufinalproject;

public class Income {
    // Declaring variables
    private String month;
    private String type;
    private double total;

    // Default constructor
    public Income() {
        this.month = "";
        this.type = "";
        this.total = 0.0;
    }

    // Parameterized constructor
    public Income(String month, String type, double total){
        this.month = month;
        this.type = type;
        this.total = total;
    }

    // Getters
    public String getMonth(){
        return month;
    }

    public String getType(){
        return type;
    }

    public double getTotal(){
        return total;
    }

    // Setters
    public void setType(String type) {
        this.type = type;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public void setMonth(String month) {
        this.month = month;
    }
}