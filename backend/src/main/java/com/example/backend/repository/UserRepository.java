package com.example.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {
//	Optional<User> findByEmail(String email);
	User findByUsername(String username);
}
