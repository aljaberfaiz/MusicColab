package com.backend.Controllers;

import com.MC.musicColab.Model.user;
import com.backend.services.userService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private userService userService;

    // Register a new user
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestParam String username, @RequestParam String password) {
        try {
            user newUser = userService.register(username, password);
            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error during registration: " + e.getMessage());
        }
    }

    // Login an existing user
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String username, @RequestParam String password) {
        user existingUser = userService.login(username, password);
        if (existingUser != null) {
            return ResponseEntity.ok(existingUser); // Return user object on successful login
        } else {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }
}
