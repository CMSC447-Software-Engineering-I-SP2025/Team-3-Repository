package server.api.models;

import java.util.Collection;
import java.util.Collections;

import org.bson.types.ObjectId;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class UserPrinciple implements UserDetails {
  private User user;

  public UserPrinciple(User user) {
    this.user = user;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
      return Collections.singleton(new SimpleGrantedAuthority("USER"));
  }

  @Override
  public String getPassword() {
    return user.getPasswordHash();
  }

  @Override
  public String getUsername() {
    return user.getUsername();
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  public ObjectId getUserId() { return this.user.getId(); }
}
