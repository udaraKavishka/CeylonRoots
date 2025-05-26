package com.example.backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlogComment extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "blog_post_id")
    private BlogPost post;

    private String author;
    private String avatarUrl;
    private LocalDateTime commentDate;
    
    @Lob
    private String text;

	public BlogComment(Long id, LocalDateTime createdAt, LocalDateTime updatedAt, BlogPost post, String author,
			String avatarUrl, LocalDateTime commentDate, String text) {
		super(id, createdAt, updatedAt);
		this.post = post;
		this.author = author;
		this.avatarUrl = avatarUrl;
		this.commentDate = commentDate;
		this.text = text;
	}

	public BlogPost getPost() {
		return post;
	}

	public void setPost(BlogPost post) {
		this.post = post;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getAvatarUrl() {
		return avatarUrl;
	}

	public void setAvatarUrl(String avatarUrl) {
		this.avatarUrl = avatarUrl;
	}

	public LocalDateTime getCommentDate() {
		return commentDate;
	}

	public void setCommentDate(LocalDateTime commentDate) {
		this.commentDate = commentDate;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}
    
    
}