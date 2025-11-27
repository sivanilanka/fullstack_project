package com.esd.slarayservice.controller;

import com.esd.slarayservice.entity.Employee;
import com.esd.slarayservice.repository.EmployeeRepository;
import com.esd.slarayservice.security.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class SessionController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/api/session")
    public Map<String, Object> session(HttpServletRequest request) {

        Map<String, Object> response = new HashMap<>();
        response.put("authenticated", false);
        response.put("principal", null);
        response.put("email", null);
        response.put("employeeFound", false);

        // check cookies and validate JWT
        String token = null;
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("JWT".equals(cookie.getName())) {
                    token = cookie.getValue();
                    break;
                }
            }
        }

        if (token != null && jwtUtil.validateToken(token)) {
            String email = jwtUtil.getSubject(token);
            response.put("authenticated", true);
            response.put("email", email);

            Employee emp = employeeRepository.findByEmail(email).orElse(null);
            if (emp != null) {
                String name = String.join(" ",
                        emp.getFirstName() != null ? emp.getFirstName() : "",
                        emp.getLastName() != null ? emp.getLastName() : "").trim();
                response.put("principal", name.isEmpty() ? email : name);
                response.put("employeeFound", true);
            } else {
                response.put("principal", email);
                response.put("employeeFound", false);
            }
        }

        return response;
    }
}
