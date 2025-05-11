package com.example.backend.model;

import java.time.LocalDate;
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