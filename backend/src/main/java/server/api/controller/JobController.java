package server.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.lang.Assert;
import server.api.dao.JobDAO;
import server.api.models.Job;

@RestController
@RequestMapping("jobs")
public class JobController {
  private final JobDAO dao;

  public JobController(JobDAO dao) {
    Assert.notNull(dao, "Dao cannot be null");
    this.dao = dao;
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
  
}
