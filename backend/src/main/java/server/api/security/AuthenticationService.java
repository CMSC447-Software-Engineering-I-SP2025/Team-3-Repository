package server.api.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import server.api.models.LoginRequest;

@Service
public class AuthenticationService {
  @Autowired
  private AuthenticationManager manager;
  @Autowired
  private JwtService jwtService;

  public String verify(LoginRequest request) {
    Authentication auth = manager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
    if (auth.isAuthenticated()) {
      return this.jwtService.generateToken(request.getUsername());
    }
    
    return null;
  }
  
}
