package server.api.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import server.api.dao.UserDAO;
import server.api.models.User;
import server.api.models.UserPrinciple;

@Service
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {
  @Autowired
  private UserDAO userDao;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = this.userDao.findByUsername(username);
    if (user == null) {
      throw new UsernameNotFoundException("User Not Found.");
    }

    return new UserPrinciple(user);
  }
  
}
