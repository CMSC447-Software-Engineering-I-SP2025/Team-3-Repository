package server.api.security;

import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.Claims;
import java.util.function.Function;

@Service
public class JwtService {

  @Value("${signingKey}")
  private String signingKey;

  private SecretKey getSigningKey() {
    return Keys.hmacShaKeyFor(Decoders.BASE64.decode(signingKey));
  }

  public String generateToken(String username) {
    Map<String, Object> claims = new HashMap<>();
    long currentTime = System.currentTimeMillis();
    Date issuedDate = new Date(currentTime);
    Date expiration = new Date(currentTime * 60 * 60 * 30);

    return Jwts.builder()
      .claims()
      .add(claims)
      .subject(username)
      .issuedAt(issuedDate)
      .expiration(expiration)
      .and()
      .signWith(this.getSigningKey())
      .compact();
  }

    public String extractUserName(String token) {
        // extract the username from jwt token
        return this.extractClaim(token, Claims::getSubject);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
      return Jwts.parser()
        .verifyWith(this.getSigningKey())
        .build()
        .parseSignedClaims(token)
        .getPayload();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
      if (this.isTokenExpired(token)) { return false; }

      return this.extractUserName(token).equals(userDetails.getUsername()); 
    }

    private boolean isTokenExpired(String token) {
      return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
      return extractClaim(token, Claims::getExpiration);
    }
}
