package com.example.backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "blog_comment")
@Data
public class BlogComment extends BaseEntity {
	public BlogComment(Long id, LocalDateTime createdAt, LocalDateTime updatedAt) {
		super(id, createdAt, updatedAt);
		// TODO Auto-generated constructor stub
	}

	private String author;
    private String avatarUrl;
    private LocalDateTime commentDate;
    
    @Lob
    private String text;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private BlogPost post;
}