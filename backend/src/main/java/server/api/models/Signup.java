package server.api.models;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Signup {

    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String password;


	public User toUser() {
		User user = new User();
		user.setUsername(this.username);
		user.setFirstName(this.firstName);
		user.setLastName(this.lastName);
		user.setEmail(this.email);
		// omitting passwords for now
		return user;
	}
}