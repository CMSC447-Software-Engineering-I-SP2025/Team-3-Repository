package server.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.Assert;
import java.util.List;
import java.util.Map;

import server.api.dao.ApplicationDAO;
import server.api.models.Application;
import server.api.security.CurrentUserResolver;
import server.api.security.UserSecurityException;

@RestController
@RequestMapping("application")
public class ApplicationController {

    private final ApplicationDAO dao;

    public ApplicationController(ApplicationDAO dao) {
        Assert.notNull(dao, "DAO cannot be null!");
        this.dao = dao;
    }

    //get all of the applications by a user
    @GetMapping("/user")
    public ResponseEntity<List<Application>> getAllApps(@RequestParam("userId") String userId) {
        Assert.hasText(userId, "User Id can not be empty!");

        List<Application> applications = this.dao.getAllByUserId(userId);
        return ResponseEntity.ok(applications);
    }

    //get single application by ID
    @GetMapping("/id")
    public ResponseEntity<Application> getApp(@RequestParam("id") String id) {
        Assert.hasText(id, "ID must not be empty!");

        Application application = this.dao.getById(id);
        if (application == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(application);
    }

    //create new application
    @PostMapping("/create")
    public ResponseEntity<Application> createApp(@RequestBody Application application) {
        Assert.notNull(application, "Application body cannot be null!");
        Assert.hasText(application.getUserId(), "User ID must not be empty!");
        CurrentUserResolver.canPerformAction(application.getUserId());

        Application saved = this.dao.create(application);
        if (saved == null) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(saved);
    }

    //update an application
    @PutMapping("/modify")
    public ResponseEntity<Application> modifyApp(@RequestBody Application application) {
        Assert.notNull(application, "Application body cannot be null!");
        Assert.notNull(application.getId(), "Application ID must not be empty");

        boolean updated = this.dao.update(application);
        if (!updated) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(application);
    }

    //delete an application
    @DeleteMapping
    public ResponseEntity<Boolean> deleteApp(@RequestParam("id") String id) {
        Assert.hasText(id, "ID must not be empty!");

        boolean deleted = this.dao.delete(id);
        if (!deleted) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(true);
    }

    @PatchMapping("/batch-update")
    public ResponseEntity<?> batchUpdateApps(
        @RequestBody Map<String, Object> payload,
        @RequestParam("userId") String userId
    ) {
        try {
            CurrentUserResolver.canPerformAction(userId);
            
            if (!payload.containsKey("applicationIds") || !payload.containsKey("updateFields")) {
                return ResponseEntity.badRequest().body("Missing required fields in payload");
            }
            
            @SuppressWarnings("unchecked")
            List<String> applicationIds = (List<String>) payload.get("applicationIds");
            @SuppressWarnings("unchecked")
            Map<String, Object> updateFields = (Map<String, Object>) payload.get("updateFields");
            
            if (applicationIds.isEmpty()) {
                return ResponseEntity.badRequest().body("No application IDs provided");
            }
            
            long updatedCount = dao.batchUpdate(applicationIds, updateFields);
            return ResponseEntity.ok(updatedCount);
        } catch (UserSecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An unexpected error occurred");
        }
    }

    @DeleteMapping("/batch-delete")
    public ResponseEntity<?> batchDeleteApps(
        @RequestBody List<String> applicationIds,
        @RequestParam("userId") String userId
    ) {
        try {
            CurrentUserResolver.canPerformAction(userId);
            
            if (applicationIds == null || applicationIds.isEmpty()) {
                return ResponseEntity.badRequest().body("No application IDs provided");
            }
            
            long deletedCount = dao.batchDelete(applicationIds);
            return ResponseEntity.ok(deletedCount);
        } catch (UserSecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An unexpected error occurred");
        }
    }
}