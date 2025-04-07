package server.api.models;

import lombok.Data;

@Data
public class UserDTO {
  private String email;

  public static UserDTO fromUser(User user) {
    UserDTO dto = new UserDTO();
    dto.setEmail(user.getEmail());
    return dto;
  }
}
