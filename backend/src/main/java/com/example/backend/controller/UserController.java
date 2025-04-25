//package com.example.backend.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.example.backend.model.User;
//import com.example.backend.service.UserService;
//
//@RestController
//@RequestMapping("/user")
//@CrossOrigin("*")
//public class UserController {
//    @Autowired
//    private UserService userService;
//
//    @PostMapping("/sign")
//    public ResponseEntity<?> createUser(@RequestBody User user) {
//        if (user.getUsername() == null || user.getUsername() == "") {
//            return ResponseEntity.status(422).body("Username Required!");
//        }
//        if (user.getPassword() == null || user.getPassword() == "") {
//            return ResponseEntity.status(422).body("Password Required!");
//        }
//        userService.createUser(user);
//        return ResponseEntity.status(201).body(user);
//    }
//}