package server.api.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {
  @Autowired
  private JwtService jwtService;
  @Autowired
  private UserDetailsService detailsService;
  
  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    String header = request.getHeader("Authorization");
    if (header != null && header.startsWith("Bearer ")) {
      String token = header.substring(7);
      String username = this.jwtService.extractUserName(token);

      if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
        UserDetails details = detailsService.loadUserByUsername(username);
        if (this.jwtService.validateToken(token, details)) {
          UsernamePasswordAuthenticationToken localToken = new UsernamePasswordAuthenticationToken(details, null, details.getAuthorities()); 
          localToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
          SecurityContextHolder.getContext().setAuthentication(localToken);
        } 
      }
    }

    filterChain.doFilter(request, response);
  }
}
