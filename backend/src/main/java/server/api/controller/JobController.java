package server.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import io.jsonwebtoken.lang.Assert;
import server.api.dao.JobDAO;
import server.api.models.Job;
import server.api.dao.UserDAO;
import server.api.models.User;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("jobs")
public class JobController {
	private final JobDAO dao;
	private final UserDAO userDAO;

	public JobController(JobDAO dao, UserDAO userDAO) {
		Assert.notNull(dao, "Dao cannot be null");
		Assert.notNull(userDAO, "UserDAO cannot be null");
		this.dao = dao;
		this.userDAO = userDAO;
	}

	@PostMapping("/create")
	public ResponseEntity<Job> saveOne(@RequestBody Job job) {
		Assert.notNull(job, "Job is required");
		Job saved = this.dao.saveOne(job);
		if (saved == null) {
			return ResponseEntity.notFound().build();
		}
		
		return ResponseEntity.ok(saved);
	}
  
	@GetMapping("/match")
	public ResponseEntity<List<Job>> matchJobs(@RequestParam("userId") String userId) {
		Assert.hasText(userId, "User ID is required");

		User user = this.userDAO.findById(userId);
		if (user == null || user.getSkills() == null || user.getSkills().isEmpty()) {
			return ResponseEntity.ok(new ArrayList<>()); // empty list
		}

		List<String> userSkills = user.getSkills();

		List<Job> matchedJobs = this.dao.findByKeywords(userSkills);
		if (matchedJobs.isEmpty()) {
			return ResponseEntity.ok(new ArrayList<>());
		}

		if (matchedJobs.size() > 50) {
			matchedJobs = matchedJobs.subList(0, 50);
		}

		matchedJobs.sort((job1, job2) -> {
			int matchesJob2 = countMatches(userSkills, job2.getKeywords());
			int matchesJob1 = countMatches(userSkills, job1.getKeywords());
			return Integer.compare(matchesJob2, matchesJob1);
		});

		if (matchedJobs.size() > 20) {
			matchedJobs = matchedJobs.subList(0, 20);
		}

		return ResponseEntity.ok(matchedJobs);
	}

	private int countMatches(List<String> userSkills, List<String> jobSkills) {
		if (jobSkills == null || jobSkills.isEmpty()) {
			return 0;
		}
		int count = 0;
		for (String skill : userSkills) {
			if (jobSkills.contains(skill)) {
				count++;
			}
		}
		return count;
	}
}
