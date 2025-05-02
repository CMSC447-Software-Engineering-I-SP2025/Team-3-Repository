package server.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Assert;
import java.util.List;

import server.api.dao.UserDAO;
import server.api.mailing.Mail;
import server.api.mailing.Mailer;
import server.api.models.User;
import server.api.models.Signup;

@RestController
@RequestMapping("users")
public class UserController {

    private final UserDAO dao;
		private final Mailer mailer;

    public UserController(UserDAO dao, Mailer mailer) {
			Assert.notNull(dao, "Dao cannot be null!");
			this.dao = dao;
			Assert.notNull(mailer, "mailer not null");
			this.mailer = mailer;
    }

    @GetMapping
		public ResponseEntity<List<User>> getAllUsers() {
			return ResponseEntity.ok(this.dao.getAll());
		}


    @GetMapping("/email")
    public ResponseEntity<User> getUserByEmail(@RequestParam("email") String email) {
		Assert.hasText(email, "Email must not be empty!");
		
        User user = this.dao.findByEmail(email);
        if (user == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(user);
        }
    }

    @PostMapping("/register")
		public ResponseEntity<User> createUser(@RequestBody User user) {
			Assert.notNull(user, "User body cannot be null!");
			Assert.notNull(user.getPasswordHash(), "Cannot register with empty password.");

			User saved = this.dao.createOne(user);
			if (saved == null) {
				return ResponseEntity.badRequest().build();
			}

			return ResponseEntity.ok(saved);
		}

    @PutMapping("/modify")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
			Assert.notNull(user, "User body cannot be null!");
		
			boolean saved = this.dao.updateOne(user);
			if (!saved) {
				return ResponseEntity.notFound().build();
			}
		
			return ResponseEntity.ok(user);
    }

    @DeleteMapping("/delete")
		public ResponseEntity<Boolean> deleteOne(@RequestParam("id") String id) {
			Assert.hasText(id, "Id must not be empty.");

			boolean deleted = this.dao.deleteOne(id);
			if (!deleted) {
				return ResponseEntity.notFound().build();
			}

			return ResponseEntity.ok(true);
		}
	
	@PostMapping("/signup")
		public ResponseEntity<User> signup(@RequestBody Signup signup) {
			
			Assert.notNull(signup, "Signup body cannot be null!");
			Assert.hasText(signup.getEmail(), "Email must not be empty!");
			Assert.hasText(signup.getUsername(), "Username must not be empty!");
			User existing = this.dao.findByEmail(signup.getEmail());
			if (existing != null) {
				return ResponseEntity.status(409).build();
			}

			User saved = this.dao.createOne(signup.toUser());
			if (saved == null) {
				return ResponseEntity.badRequest().build();
			}

			Mail mail = new Mail();
			mail.setSubject(String.format("Welcome to Application Tracker, %s!", saved.getFirstName()));
			mail.setTo(saved.getEmail());
			mail.setText(String.format(
				"%s,\nWe're so glad to have you on our platform! If you haven't already head over to http://localhost:3000 and get logged in!\nWe recommend reading the FAQ before you start tracking your applications."
			, saved.getFirstName()));

			return ResponseEntity.ok(saved);
		}
}
