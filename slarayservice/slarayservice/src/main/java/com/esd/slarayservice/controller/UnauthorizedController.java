package com.esd.slarayservice.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UnauthorizedController {

    @GetMapping("/unauthorized")
    public String unauthorized() {
        return "error-unauthorized";
    }
}
