package com.backend.Controllers;

import com.backend.services.AuthService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private AuthService authService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // Extract the Authorization header
        String token = request.getHeader("Authorization");

        // Check if the token exists and starts with "Bearer "
        if (token == null || !token.startsWith("Bearer ")) {
            // If the Authorization header is missing or malformed, respond with an Unauthorized error
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Unauthorized: Missing or Malformed Token");
            return;  // Stop further processing
        }

        String tokenStr = token.substring(7);  // Extract the token string by removing "Bearer "

        try {
            // Validate the token using the AuthService
            Long userId = authService.validateToken(tokenStr);

            if (userId == null) {
                // If token is invalid, set the response status to 401 Unauthorized
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Unauthorized: Invalid Token");
                return;  // Stop further processing of the request
            }

            // Set the userId as a request attribute to be used later
            request.setAttribute("userId", userId);

        } catch (Exception e) {
            // Handle any unexpected errors during token validation
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Unauthorized: Token Validation Error");
            return;  // Stop further processing
        }

        // Proceed to the next filter in the chain
        filterChain.doFilter(request, response);
    }
}
