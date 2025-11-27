package com.esd.slarayservice.service;

import com.esd.slarayservice.entity.Employee;
import com.esd.slarayservice.entity.EmployeeSalary;
import com.esd.slarayservice.repository.EmployeeRepository;
import com.esd.slarayservice.repository.EmployeeSalaryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class EmployeeSalaryService {

    private final EmployeeSalaryRepository salaryRepo;
    private final EmployeeRepository employeeRepo;

    public EmployeeSalaryService(EmployeeSalaryRepository salaryRepo, EmployeeRepository employeeRepo) {
        this.salaryRepo = salaryRepo;
        this.employeeRepo = employeeRepo;
    }

    @Transactional
    public List<EmployeeSalary> disburse(List<Long> employeeIds, Double amount, String description, String loggedInEmail) {
        List<EmployeeSalary> saved = new ArrayList<>();

        for (Long id : employeeIds) {
            Optional<Employee> opt = employeeRepo.findById(id);
            if (opt.isPresent()) {
                Employee e = opt.get();

                EmployeeSalary s = new EmployeeSalary();
                s.setEmployee(e);
                s.setAmount(amount);
                s.setDescription(description);
                s.setPaymentDate(LocalDateTime.now());
                saved.add(salaryRepo.save(s));
            }
        }
        return saved;
    }

    public List<EmployeeSalary> historyForEmployee(Long employeeId) {
        return employeeRepo.findById(employeeId)
                .map(salaryRepo::findByEmployeeOrderByPaymentDateDesc)
                .orElse(Collections.emptyList());
    }

    public List<EmployeeSalary> allHistory() {
        return salaryRepo.findAll();
    }

    // ===========================================
    // ✅ FIND BY ID
    // ===========================================
    public Optional<EmployeeSalary> findById(Long id) {
        return salaryRepo.findById(id);
    }

    // ===========================================
    // ✅ UPDATE SALARY RECORD
    // ===========================================
    @Transactional
    public EmployeeSalary updateSalary(Long id, EmployeeSalary updatedData) {

        EmployeeSalary existing = salaryRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Salary record not found with ID " + id));

        if (updatedData.getAmount() == null || updatedData.getAmount() <= 0) {
            throw new RuntimeException("Amount must be greater than zero");
        }

        existing.setAmount(updatedData.getAmount());
        existing.setDescription(updatedData.getDescription());

        return salaryRepo.save(existing);
    }
}
