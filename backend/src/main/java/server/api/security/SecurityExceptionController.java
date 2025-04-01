package server.api.security;

import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class SecurityExceptionController {
  private static final org.slf4j.Logger LOG = LoggerFactory.getLogger(SecurityExceptionController.class);

  /**
   * Simple helper when a security exception is thrown
   * @param exec
   * @return
   */
  @ExceptionHandler(UserSecurityException.class)
  public ResponseEntity<Object> handleException(UserSecurityException exec) {
    LOG.error("Caught Exception: {}", exec.getMessage());
    return ResponseEntity.status(exec.getHttpStatus()).build();
  }
}