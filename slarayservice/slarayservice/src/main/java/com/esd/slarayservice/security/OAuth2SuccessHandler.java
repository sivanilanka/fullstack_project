package com.esd.slarayservice.security;

import com.esd.slarayservice.entity.Employee;
import com.esd.slarayservice.repository.EmployeeRepository;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;

@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private static final Logger log = LoggerFactory.getLogger(OAuth2SuccessHandler.class);

    private final JwtUtil jwtUtil;
    private final EmployeeRepository employeeRepository;

    public OAuth2SuccessHandler(JwtUtil jwtUtil, EmployeeRepository employeeRepository) {
        this.jwtUtil = jwtUtil;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        log.info("=== OAUTH SUCCESS HANDLER TRIGGERED ===");

        if (authentication == null) {
            log.error("Authentication object is NULL!");
            response.sendRedirect("http://localhost:3000/unauthorized?reason=auth_null");
            return;
        }

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        String email = oAuth2User.getAttribute("email");
        String name  = oAuth2User.getAttribute("name");

        log.info("Google Login Attempt → Email: {}, Name: {}", email, name);

        // 1️⃣ FIND EMPLOYEE BY EMAIL
        Optional<Employee> employeeOpt = employeeRepository.findByEmail(email);

        if (employeeOpt.isEmpty()) {
            log.warn("❌ BLOCKED: Email not found in system → {}", email);
            response.sendRedirect("http://localhost:3000/unauthorized?reason=not_found");
            return;
        }

        Employee employee = employeeOpt.get();

        // 2️⃣ CHECK DEPARTMENT = FINANCE ONLY
        if (employee.getDepartment() == null ||
                !employee.getDepartment().getName().equalsIgnoreCase("Finance")) {

            log.warn("❌ BLOCKED: {} is NOT Finance department (Found: {})",
                    email,
                    employee.getDepartment() != null ? employee.getDepartment().getName() : "No Department");

            response.sendRedirect("http://localhost:3000/unauthorized?reason=not_finance");
            return;
        }

        // 3️⃣ VALID USER → GENERATE JWT
        String token = jwtUtil.generateToken(email);
        log.info("✔ ACCESS GRANTED → Finance User: {}", email);

        Cookie cookie = new Cookie("JWT", token);
        cookie.setHttpOnly(false);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setAttribute("SameSite", "Lax");
        response.addCookie(cookie);

        // 4️⃣ SUCCESS REDIRECT
        response.sendRedirect("http://localhost:3000/welcome?name=" + name);
    }
}
