package server.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.Assert;
import java.util.List;

import server.api.dao.ApplicationDAO;
import server.api.models.Application;
import server.api.models.BatchUpdateRequest;
import server.api.models.BatchUpdateRequest.BatchUpdateType;
import server.api.security.CurrentUserResolver;
import server.api.security.UserSecurityException;

@RestController
@RequestMapping("application")
public class ApplicationController {

    private final ApplicationDAO dao;
    private static final Logger LOG = LoggerFactory.getLogger(ApplicationController.class);

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


    @PostMapping("/batch")
    public ResponseEntity<Boolean> batchUpdate(@RequestBody BatchUpdateRequest request) {
        Assert.notNull(request , "missing request body");
        if (request.getApplicationIds() == null || request.getApplicationIds().isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        String uid = CurrentUserResolver.getUserId();
        List<Application> resolved = this.dao.findInListAndUid(uid, request.getApplicationIds());

        List<String> finalIds = resolved.stream().map(x -> x.getId().toString()).toList();

        if (finalIds.size() != request.getApplicationIds().size()) {
            LOG.error("Batch update failed: mismatch in id count.");
            return ResponseEntity.notFound().build();
        }

        if (resolved == null || resolved.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        if (request.getType() == BatchUpdateType.PRIORITY && request.getPriority() != null) {
            return ResponseEntity.ok(this.dao.batchPriority(finalIds, request.getPriority(), uid));
        }

        if (request.getType() == BatchUpdateType.STATUS && request.getStatus() != null) {
            return ResponseEntity.ok(this.dao.batchStatus(finalIds, request.getStatus(), uid));
        }

        LOG.error("No matching batch operation was found");
        return ResponseEntity.notFound().build();
    }
}