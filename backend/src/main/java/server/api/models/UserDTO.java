package server.api.models;

import lombok.Data;

@Data
public class UserDTO {
  private String email;
  private String id;

  public static UserDTO fromUser(User user) {
    UserDTO dto = new UserDTO();
    dto.setEmail(user.getEmail());
    dto.setId(user.getId().toString());
    return dto;
  }
}
