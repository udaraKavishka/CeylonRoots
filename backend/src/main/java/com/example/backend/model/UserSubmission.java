package com.example.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserSubmission {
    private String name;
    private String email;
}