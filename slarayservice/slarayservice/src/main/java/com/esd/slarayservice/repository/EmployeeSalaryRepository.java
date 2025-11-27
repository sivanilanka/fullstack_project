package com.esd.slarayservice.repository;

import com.esd.slarayservice.entity.EmployeeSalary;
import com.esd.slarayservice.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeSalaryRepository extends JpaRepository<EmployeeSalary, Long> {
    List<EmployeeSalary> findByEmployeeOrderByPaymentDateDesc(Employee employee);
}
