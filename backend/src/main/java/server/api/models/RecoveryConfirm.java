package server.api.models;

import lombok.Data;

@Data
public class RecoveryConfirm {
	private String recoveryId;
	private String email;
	private String password;
	private String confirmPassword;
	private String token;
}
