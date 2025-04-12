package server.api.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.lang.Assert;
import server.api.dao.ApplicationDAO;
import server.api.dao.UserDAO;
import server.api.models.Application;
import server.api.models.ApplicationSearch;
import server.api.models.User;
import server.api.security.CurrentUserResolver;

@RestController
@RequestMapping("search")
public class ApplicationSearchController {
  private final UserDAO userDao;
  private final ApplicationDAO applicationDAO;
  private final Logger LOG = LoggerFactory.getLogger(ApplicationSearchController.class);

  public ApplicationSearchController(UserDAO userDao, ApplicationDAO appDao) {
    Assert.notNull(appDao, "Application DAO Must be supplied");
    Assert.notNull(userDao, "User DAO Must be supplied");

    this.applicationDAO = appDao;
    this.userDao = userDao;
  }


  @PostMapping
  public ResponseEntity<List<Application>> fetchApplications(@RequestBody ApplicationSearch request) {
    Assert.notNull(request, "Request must not be null!");
    LOG.info("Got request to search.");

    String userId = CurrentUserResolver.getUserId();
    request.setUserId(userId);

    User resolvedUser = this.userDao.findById(userId);
    if (resolvedUser == null) {
      LOG.error("Unable to resolve user with ID {}", userId);
      return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok(this.applicationDAO.doFilter(request));
  }
  
}
