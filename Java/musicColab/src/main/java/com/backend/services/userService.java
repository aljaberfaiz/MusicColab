package com.backend.services;

import com.MC.musicColab.Model.user;
import com.MC.musicColab.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service // Add @Service annotation to mark it as a service
public class userService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    public userService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public user register(String username, String password) {
        String hashedPassword = passwordEncoder.encode(password);
        user user = new user();
        user.setUsername(username);
        user.setPassword(hashedPassword);
        return userRepository.save(user);
    }

    public user login(String username, String password) {
        user user = userRepository.findByUsername(username);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return user;
        }
        return null;
    }
}
