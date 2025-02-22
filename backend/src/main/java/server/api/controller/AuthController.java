package server.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Assert;
import com.mongodb.client.MongoDatabase;
import java.util.List;
import org.bson.Document;

import server.api.dao.AuthDAO;
import server.api.models.Authorization;


// Basic REST Controller
// This resolves to http://localhost:8080/auth
@RestController
@RequestMapping("auth")
public class AuthController {

  private final AuthDAO dao;

  // Basic Constructor for the Controller.
  // Any parameters a controller ingests must have a Bean definition
  // in the config/Config.java file.
  public AuthController(AuthDAO dao) {
    Assert.notNull(dao, "Dao cannot be null!");
    this.dao = dao;
  }

  // GET Route for http://localhost:8080/auth
  @GetMapping
  public ResponseEntity<List<Authorization>> getTokens() {
    return ResponseEntity.ok(this.dao.getAll());
  }


  // API Route for localhost:8080/auth/id?id=<param>
  @GetMapping("/id")
  public ResponseEntity<Authorization> getSingle(@RequestParam("id") String id) {
    Assert.hasText("id", "Id must not be empty!");

    Authorization auth = this.dao.findById(id);
    if (auth == null) {
      return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok(auth);
  }

  @PostMapping("/create")
  public ResponseEntity<Authorization> createOne(@RequestBody Authorization auth) {
    Assert.notNull(auth, "Auth body cannot be null!");
    
    Authorization saved = this.dao.createOne(auth);
    if (saved == null) {
      return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok(saved);
  }


  @PutMapping("/modify")
  public ResponseEntity<Authorization> modify(@RequestBody Authorization auth) {
    Assert.notNull(auth, "Auth body cannot be null!");
    
    boolean saved = this.dao.updateOne(auth);
    if (!saved) {
      return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok(auth);
  }

  @DeleteMapping
  public ResponseEntity<Boolean> deleteOne(@RequestParam("id") String id) {
    Assert.hasText(id, "Id must not be empty.");

    boolean deleted = this.dao.deleteOne(id);
    if (!deleted) {
      return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok(true);
  }

}

