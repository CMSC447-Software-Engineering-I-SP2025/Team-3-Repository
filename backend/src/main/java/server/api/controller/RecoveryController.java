package server.api.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Assert;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.http.HttpStatus;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.UUID;

import server.api.dao.RecoveryDAO;
import server.api.dao.UserDAO;
import server.api.models.Recovery;
import server.api.models.RecoveryConfirm;
import server.api.models.User;

@RestController
@RequestMapping("recovery")
public class RecoveryController {
	
	private static final Logger logger = LoggerFactory.getLogger(RecoveryController.class);
	private final RecoveryDAO recoveryDao;
	private final UserDAO userDao;

	public RecoveryController(RecoveryDAO recoveryDao, UserDAO userDao) {
		Assert.notNull(recoveryDao, "RecoveryDAO must not be null!");
		Assert.notNull(userDao, "UserDAO must not be null!");
		this.recoveryDao = recoveryDao;
		this.userDao = userDao;
	}

	@PostMapping
	public ResponseEntity<Void> initiateRecovery(@RequestBody Recovery request) {
		Assert.notNull(request, "Recovery request must not be null!");
		Assert.hasText(request.getUsername(), "Username must not be empty!");
		Assert.hasText(request.getEmail(), "Email must not be empty!");

		logger.info("============ Initiating recovery process ============");
		logger.info("Request received: email='{}', username='{}'", request.getEmail(), request.getUsername());

		User user = this.userDao.findByEmail(request.getEmail());

		if (user == null) {
			logger.warn("No user found for email='{}'", request.getEmail());
			return ResponseEntity.ok().build(); // silent fail
		}

		logger.info("User found in database: username='{}', email='{}'", user.getUsername(), user.getEmail());

		if (!user.getUsername().equals(request.getUsername())) {
			logger.warn("Username mismatch for email='{}'. Expected='{}', Provided='{}'", request.getEmail(), user.getUsername(), request.getUsername());
			return ResponseEntity.ok().build(); // silent fail again
		}

		boolean deleted = this.recoveryDao.deleteByEmail(request.getEmail());

		Recovery recovery = new Recovery();
		recovery.setUsername(request.getUsername());
		recovery.setEmail(request.getEmail());
		recovery.setToken(UUID.randomUUID().toString());

		Recovery saved = this.recoveryDao.createOne(recovery);
		if (saved == null) {
			logger.error("Failed to create recovery record for email='{}'", request.getEmail());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}

		logger.info("Successfully created recovery document: id='{}', token='{}'", saved.getId(), saved.getToken());

		return ResponseEntity.ok().build();
	}



	@PostMapping("/confirm")
	public ResponseEntity<Void> confirmRecovery(@RequestBody RecoveryConfirm confirmRequest) {
		Assert.notNull(confirmRequest, "RecoveryConfirm body must not be null!");
		Assert.hasText(confirmRequest.getRecoveryId(), "Recovery ID must not be empty!");
		Assert.hasText(confirmRequest.getEmail(), "Email must not be empty!");
		Assert.hasText(confirmRequest.getPassword(), "Password must not be empty!");
		Assert.hasText(confirmRequest.getConfirmPassword(), "Confirm password must not be empty!");
		Assert.hasText(confirmRequest.getToken(), "Token confirmation cannot be null.");

		logger.info("Received password recovery confirmation for email='{}'", confirmRequest.getEmail());

		if (!confirmRequest.getPassword().equals(confirmRequest.getConfirmPassword())) {
			logger.warn("Password confirmation mismatch for email='{}'", confirmRequest.getEmail());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}

		ObjectId id = new ObjectId(confirmRequest.getRecoveryId());
		Recovery recovery = this.recoveryDao.findById(id);

		if (recovery == null || !recovery.getEmail().equals(confirmRequest.getEmail())) {
			logger.warn("Invalid recovery ID='{}' for email='{}'", confirmRequest.getRecoveryId(), confirmRequest.getEmail());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}

		if (!recovery.getToken().equals(confirmRequest.getToken())) {
			logger.error("Token mismatch for recovery confirm {}", confirmRequest.getToken());
			return ResponseEntity.badRequest().build();
		}

		User user = this.userDao.findByEmail(confirmRequest.getEmail());
		if (user == null) {
			logger.warn("User not found for password reset: email='{}'", confirmRequest.getEmail());
			return ResponseEntity.notFound().build();
		}

		boolean updated = this.userDao.updatePassword(user, confirmRequest.getPassword());

		// delete the recovery doc for cleanup
		this.recoveryDao.deleteById(confirmRequest.getRecoveryId());

		if (!updated) {
			logger.error("Failed to update password for user: email='{}'", confirmRequest.getEmail());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}

		logger.info("Password successfully updated for user: email='{}'", confirmRequest.getEmail());
		return ResponseEntity.ok().build();
	}
}
