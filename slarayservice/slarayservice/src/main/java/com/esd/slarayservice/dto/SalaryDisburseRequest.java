package com.esd.slarayservice.dto;

import java.util.List;

public class SalaryDisburseRequest {
    private List<Long> employeeIds;
    private Double amount;
    private String description;

    public List<Long> getEmployeeIds() { return employeeIds; }
    public void setEmployeeIds(List<Long> employeeIds) { this.employeeIds = employeeIds; }
    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
