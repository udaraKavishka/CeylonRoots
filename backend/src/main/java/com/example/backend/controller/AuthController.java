//package com.example.backend.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.example.backend.model.User;
//import com.example.backend.security.JwtUtils;
//
//@RestController
//@RequestMapping("/user")
//@CrossOrigin("*")
//public class AuthController {
//    @Autowired
//    private AuthenticationManager authenticationManager;
//
//    @Autowired
//    private JwtUtils jwtUtils;
//
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody User user) {
//        if (user.getUsername() == null || user.getUsername() == "") {
//            return ResponseEntity.status(400).body("Username Required!");
//        }
//        if (user.getPassword() == null || user.getPassword() == "") {
//            return ResponseEntity.status(400).body("Password Required!");
//        }
//        try {
//            Authentication authentication = authenticationManager
//                    .authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//            String jwtToken = jwtUtils.generateJwtToken(authentication);
//            return ResponseEntity.status(200).body(jwtToken);
//        } catch (AuthenticationException e) {
//            return ResponseEntity.status(401).body("Authentication Failed!");
//        } catch (Exception e) {
//            return ResponseEntity.status(403).body("Username or Password Incorrect!");
//        }
//    }
//}
//
//
////
////import jakarta.validation.Valid;
////import org.springframework.beans.factory.annotation.Autowired;
////import org.springframework.http.ResponseEntity;
////import org.springframework.security.authentication.AuthenticationManager;
////import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
////import org.springframework.security.core.Authentication;
////import org.springframework.security.core.context.SecurityContextHolder;
////import org.springframework.security.crypto.password.PasswordEncoder;
////import org.springframework.web.bind.annotation.*;
////
////import com.example.backend.dto.JwtResponse;
////import com.example.backend.dto.LoginRequest;
////import com.example.backend.dto.MessageResponse;
////import com.example.backend.dto.SignupRequest;
////import com.example.backend.model.Role;
////import com.example.backend.model.User;
////import com.example.backend.repository.UserRepository;
////import com.example.backend.security.JwtUtils;
////
////import java.util.HashSet;
////import java.util.List;
////import java.util.Set;
////import java.util.stream.Collectors;
////
////@CrossOrigin(origins = "*", maxAge = 3600)
////@RestController
////@RequestMapping("/api/auth")
////public class AuthController {
////    @Autowired
////    AuthenticationManager authenticationManager;
////
////    @Autowired
////    UserRepository userRepository;
////
////    @Autowired
////    PasswordEncoder encoder;
////
////    @Autowired
////    JwtUtils jwtUtils;
////
////    @PostMapping("/signin")
////    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
////        Authentication authentication = authenticationManager.authenticate(
////                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
////
////        SecurityContextHolder.getContext().setAuthentication(authentication);
////        String jwt = jwtUtils.generateJwtToken(authentication);
////        
////        User userDetails = (User) authentication.getPrincipal();
////        List<String> roles = userDetails.getAuthorities().stream()
////                .map(item -> item.getAuthority())
////                .collect(Collectors.toList());
////
////        return ResponseEntity.ok(new JwtResponse(jwt,
////                                                userDetails.getId(), 
////                                                userDetails.getEmail(),
////                                                userDetails.getFirstName(),
////                                                userDetails.getLastName(),
////                                                roles));
////    }
////
////    @PostMapping("/signup")
////    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
////        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
////            return ResponseEntity
////                    .badRequest()
////                    .body(new MessageResponse("Error: Email is already in use!"));
////        }
////
////        // Create new user's account
////        User user = new User();
////        user.setFirstName(signUpRequest.getFirstName());
////        user.setLastName(signUpRequest.getLastName());
////        user.setEmail(signUpRequest.getEmail());
////        user.setPassword(encoder.encode(signUpRequest.getPassword()));
////        user.setPhoneNumber(signUpRequest.getPhoneNumber());
////
////        Set<String> strRoles = signUpRequest.getRoles();
////        Set<Role> roles = new HashSet<>();
////
////        if (strRoles == null) {
////            roles.add(Role.ROLE_USER);
////        } else {
////            strRoles.forEach(role -> {
////                switch (role) {
////                    case "admin":
////                        roles.add(Role.ROLE_ADMIN);
////                        break;
////                    default:
////                        roles.add(Role.ROLE_USER);
////                }
////            });
////        }
////
////        user.setRoles(roles);
////        userRepository.save(user);
////
////        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
////    }
////}