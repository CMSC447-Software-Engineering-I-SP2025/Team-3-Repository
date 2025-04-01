package server.api.security;

import lombok.Data;

@Data
public class UserSecurityException extends RuntimeException {
  private int httpStatus;
  public UserSecurityException(String message, int httpStatus) {
    super(message);
    this.httpStatus = httpStatus;
  }
}
