package com.example.backend.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.example.backend.converter.LongListConverter;
import com.example.backend.converter.StringListConverter;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
public class BlogPost extends BaseEntity {
	public BlogPost(Long id, LocalDateTime createdAt, LocalDateTime updatedAt) {
		super(id, createdAt, updatedAt);
		// TODO Auto-generated constructor stub
	}

	public BlogPost(Long id, LocalDateTime createdAt, LocalDateTime updatedAt, String title, String excerpt,
			String content, String imageUrl, LocalDate postDate, String author, String category, List<String> tags,
			List<BlogComment> comments, List<Long> relatedPostIds) {
		super(id, createdAt, updatedAt);
		this.title = title;
		this.excerpt = excerpt;
		this.content = content;
		this.imageUrl = imageUrl;
		this.postDate = postDate;
		this.author = author;
		this.category = category;
		this.tags = tags;
		this.comments = comments;
		this.relatedPostIds = relatedPostIds;
	}

	private String title;
    private String excerpt;
    
    @Lob
    private String content;
    
    private String imageUrl;
    private LocalDate postDate;
    private String author;
    private String category;
    
    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "JSON")
    private List<String> tags;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<BlogComment> comments = new ArrayList<>();

    @Convert(converter = LongListConverter.class)
    @Column(columnDefinition = "JSON")
    private List<Long> relatedPostIds;
}