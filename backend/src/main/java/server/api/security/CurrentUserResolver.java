package server.api.security;

import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import server.api.models.UserPrinciple;

/**
 * Helper method to get the current UserID
 */
public class CurrentUserResolver {
  private static final Logger LOG = LoggerFactory.getLogger(CurrentUserResolver.class);
  public static String getUserId() {
    SecurityContext ctx = SecurityContextHolder.getContext();
    if (ctx != null) {
      Authentication auth = ctx.getAuthentication();
      if (auth != null) {
        LOG.error(auth.getPrincipal().toString());

        if ("anonymousUser".equals(auth.getPrincipal().toString())) {
          return null;
        }

        UserPrinciple principle = (UserPrinciple) auth.getPrincipal();
        return principle.getUserId().toString();
      }
    } 
    return null;
  }

  /**
   * Simple handshake method to see if the current user is allowed the current action.
   * @param userId user id
   * @return null if no problem, value otherwise
   */
  public static int canPerformAction(String userId) {
    String currentId = CurrentUserResolver.getUserId();

    LOG.info("Current User: {}, desired: {}", currentId, userId);
    if (currentId == null) {
      String message = "Current user is not logged in";
      throw new UserSecurityException(message, 401);
    }

    if (!userId.equals(currentId)) {
      String message = "Current user is trying to modify data for another!";
      throw new UserSecurityException(message, 403);
    }

    return 0;
  } 
}
