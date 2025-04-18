package com.example.backend.security;

import java.awt.RenderingHints.Key;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.backend.model.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;


@Service
public class JwtService {
	@Value("${application.security.jwt.secret-key}")
    private String secretKey;

    @Value("${application.security.jwt.expiration}")
    private long jwtExpiration;

    private Key getSignInKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                   .setSigningKey(getSignInKey())
                   .build()
                   .parseClaimsJws(token)
                   .getBody();
    }

    public String generateToken(User user) {
        return Jwts.builder()
                   .setSubject(user.getEmail())
                   .claim("roles", user.getRoles())
                   .setIssuedAt(new Date())
                   .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                   .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                   .compact();
    }

    public boolean isTokenValid(String token, User user) {
        final String username = extractUsername(token);
        return username.equals(user.getEmail()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }
}
