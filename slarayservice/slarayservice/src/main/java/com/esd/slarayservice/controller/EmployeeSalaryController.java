package com.esd.slarayservice.controller;

import com.esd.slarayservice.dto.SalaryDisburseRequest;
import com.esd.slarayservice.entity.EmployeeSalary;
import com.esd.slarayservice.service.EmployeeSalaryService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/salaries")
public class EmployeeSalaryController {

    private final EmployeeSalaryService salaryService;

    public EmployeeSalaryController(EmployeeSalaryService salaryService) {
        this.salaryService = salaryService;
    }

    @PostMapping("/disburse")
    public ResponseEntity<?> disburse(@RequestBody SalaryDisburseRequest request, Authentication authentication) {
        String loggedInEmail = authentication != null ? authentication.getName() : null;
        List<EmployeeSalary> saved = salaryService.disburse(
                request.getEmployeeIds(),
                request.getAmount(),
                request.getDescription(),
                loggedInEmail
        );
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/history")
    public ResponseEntity<List<EmployeeSalary>> allHistory() {
        return ResponseEntity.ok(salaryService.allHistory());
    }

    @GetMapping("/employee/{id}")
    public ResponseEntity<List<EmployeeSalary>> forEmployee(@PathVariable Long id) {
        return ResponseEntity.ok(salaryService.historyForEmployee(id));
    }

    // ✅ UPDATE SALARY RECORD — this MUST match frontend call
    @PutMapping("/{id}")
    public ResponseEntity<?> updateSalary(
            @PathVariable Long id,
            @RequestBody EmployeeSalary updated) {

        try {
            EmployeeSalary saved = salaryService.updateSalary(id, updated);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
}
