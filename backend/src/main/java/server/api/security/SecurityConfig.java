package server.api.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;

@Configuration
public class SecurityConfig {

  private static String UNAUTHORIZED_ENDPOINTS[] = { "/users/register", "/auth/login" };
  @Autowired
  private UserDetailsService detailsService;
  @Autowired
  private BCryptPasswordEncoder encoder;
  @Autowired
  private JwtFilter jwtFilter;

  @Bean
  public SecurityFilterChain unauthenticatedRoutes(HttpSecurity http) throws Exception {
    return http
      .csrf(customizer -> customizer.disable())
      .authorizeHttpRequests(request ->
        request
          .requestMatchers(UNAUTHORIZED_ENDPOINTS)
          .permitAll()
          .anyRequest()
          .authenticated()
      )
      .httpBasic(Customizer.withDefaults())
      .sessionManagement(session ->
        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      )
      .addFilterBefore(this.jwtFilter, UsernamePasswordAuthenticationFilter.class)
      .build();
  }

  @Bean
  public AuthenticationProvider authProvider() {
    DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
    provider.setPasswordEncoder(this.encoder);
    provider.setUserDetailsService(this.detailsService);

    return provider;
  }

  @Bean
  public AuthenticationManager authManager(AuthenticationConfiguration config) throws Exception {
    return config.getAuthenticationManager();
  }

}
