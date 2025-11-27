package com.esd.slarayservice.service;

import com.esd.slarayservice.entity.Employee;
import com.esd.slarayservice.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    // =======================
    // CREATE
    // =======================
    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // =======================
    // READ (GET ALL)
    // =======================
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // =======================
    // READ (GET BY ID)
    // =======================
    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id " + id));
    }

    // =======================
    // UPDATE
    // =======================
    public Employee updateEmployee(Long id, Employee updatedEmployee) {

        Employee existingEmployee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id " + id));

        existingEmployee.setFirstName(updatedEmployee.getFirstName());
        existingEmployee.setLastName(updatedEmployee.getLastName());
        existingEmployee.setEmail(updatedEmployee.getEmail());
        existingEmployee.setTitle(updatedEmployee.getTitle());

        // NEW — photograph support
        existingEmployee.setPhotographPath(updatedEmployee.getPhotographPath());

        existingEmployee.setDepartment(updatedEmployee.getDepartment());

        return employeeRepository.save(existingEmployee);
    }

    // =======================
    // DELETE
    // =======================
    public void deleteEmployee(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new RuntimeException("Employee not found with id " + id);
        }
        employeeRepository.deleteById(id);
    }
}
