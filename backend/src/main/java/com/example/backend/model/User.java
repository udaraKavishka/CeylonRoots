package com.example.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;
}



// import jakarta.persistence.*;
// import lombok.Data;
// import org.springframework.security.core.GrantedAuthority;
// import org.springframework.security.core.authority.SimpleGrantedAuthority;
// import org.springframework.security.core.userdetails.UserDetails;

// import java.util.Collection;
// import java.util.HashSet;
// import java.util.List;
// import java.util.Set;
// import java.util.stream.Collectors;

// @Entity
// @Table(name = "users")
// @Data

// public class User implements UserDetails {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;
    
//     private String firstName;
//     private String lastName;
    
// @Column(unique = true)
//     private String email;
    
//     private String password;
//     private String phoneNumber;
    
// @OneToMany(mappedBy = "user")
//     private List<Booking> bookings;
    
// @ElementCollection(fetch = FetchType.EAGER)
// @Enumerated(EnumType.STRING)
//     private Set<Role> roles = new HashSet<>();
    
// @Override
//     public Collection<? extends GrantedAuthority> getAuthorities() {
//         return roles.stream()
//                 .map(role -> new SimpleGrantedAuthority(role.name()))
//                 .collect(Collectors.toList());
//     }
    
// @Override
//     public String getUsername() {
//         return email;
//     }
    
// @Override
//     public boolean isAccountNonExpired() {
//         return true;
//     }
    
// @Override
//     public boolean isAccountNonLocked() {
//         return true;
//     }
    
// @Override
//     public boolean isCredentialsNonExpired() {
//         return true;
//     }
    
// @Override
//     public boolean isEnabled() {
//         return true;
//     }

// public User(Long id, String firstName, String lastName, String email, String password, String phoneNumber,
// 		List<Booking> bookings, Set<Role> roles) {
// 	super();
// 	this.id = id;
// 	this.firstName = firstName;
// 	this.lastName = lastName;
// 	this.email = email;
// 	this.password = password;
// 	this.phoneNumber = phoneNumber;
// 	this.bookings = bookings;
// 	this.roles = roles;
// }

// public User() {
// }




// public Long getId() {
// 	return id;
// }

// public void setId(Long id) {
// 	this.id = id;
// }

// public String getFirstName() {
// 	return firstName;
// }

// public void setFirstName(String firstName) {
// 	this.firstName = firstName;
// }

// public String getLastName() {
// 	return lastName;
// }

// public void setLastName(String lastName) {
// 	this.lastName = lastName;
// }

// public String getEmail() {
// 	return email;
// }

// public void setEmail(String email) {
// 	this.email = email;
// }

// public String getPassword() {
// 	return password;
// }

// public void setPassword(String password) {
// 	this.password = password;
// }

// public String getPhoneNumber() {
// 	return phoneNumber;
// }

// public void setPhoneNumber(String phoneNumber) {
// 	this.phoneNumber = phoneNumber;
// }

// public List<Booking> getBookings() {
// 	return bookings;
// }

// public void setBookings(List<Booking> bookings) {
// 	this.bookings = bookings;
// }

// public Set<Role> getRoles() {
// 	return roles;
// }

// public void setRoles(Set<Role> roles) {
// 	this.roles = roles;
// }



    



// }
