package com.example.backend.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlogPost extends BaseEntity {
    private String title;
    private String excerpt;
    
    @Lob
    private String content;
    
    @Column(name = "image_url")
    private String imageUrl;
    
    private LocalDate postDate;
    private String author;
    private String category;
    private Integer commentCount;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<BlogComment> comments = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "related_posts",
        joinColumns = @JoinColumn(name = "post_id"),
        inverseJoinColumns = @JoinColumn(name = "related_post_id"))
    private List<BlogPost> relatedPosts = new ArrayList<>();

	public BlogPost(Long id, LocalDateTime createdAt, LocalDateTime updatedAt, String title, String excerpt,
			String content, String imageUrl, LocalDate postDate, String author, String category, Integer commentCount,
			List<BlogComment> comments, List<BlogPost> relatedPosts) {
		super(id, createdAt, updatedAt);
		this.title = title;
		this.excerpt = excerpt;
		this.content = content;
		this.imageUrl = imageUrl;
		this.postDate = postDate;
		this.author = author;
		this.category = category;
		this.commentCount = commentCount;
		this.comments = comments;
		this.relatedPosts = relatedPosts;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getExcerpt() {
		return excerpt;
	}

	public void setExcerpt(String excerpt) {
		this.excerpt = excerpt;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public LocalDate getPostDate() {
		return postDate;
	}

	public void setPostDate(LocalDate postDate) {
		this.postDate = postDate;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public Integer getCommentCount() {
		return commentCount;
	}

	public void setCommentCount(Integer commentCount) {
		this.commentCount = commentCount;
	}

	public List<BlogComment> getComments() {
		return comments;
	}

	public void setComments(List<BlogComment> comments) {
		this.comments = comments;
	}

	public List<BlogPost> getRelatedPosts() {
		return relatedPosts;
	}

	public void setRelatedPosts(List<BlogPost> relatedPosts) {
		this.relatedPosts = relatedPosts;
	}
    
    
}