package com.backend.Controllers;

import com.MC.musicColab.Model.user;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.backend.services.userService;
import com.backend.services.AuthService;


@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private userService userService;

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody user user) {
        user registeredUser = userService.register(user.getUsername(), user.getPassword());
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody user user) {
        user loggedInUser = userService.login(user.getUsername(), user.getPassword());
        if (loggedInUser != null) {
            String token = authService.generateToken(loggedInUser.getId(), loggedInUser.getUsername());
            return ResponseEntity.ok("Bearer " + token);
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }
}