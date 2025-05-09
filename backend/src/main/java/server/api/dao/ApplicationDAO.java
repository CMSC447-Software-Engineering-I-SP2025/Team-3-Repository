package server.api.dao;
import org.springframework.util.Assert;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.stream.Collectors;

import server.api.database.DatabaseConnector;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Updates;
import com.mongodb.client.result.InsertOneResult;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import org.springframework.util.StringUtils;
import org.bson.types.ObjectId;
import org.bson.conversions.Bson;

import server.api.models.AppPriority;
import server.api.models.AppStatus;
import server.api.models.Application;
import server.api.models.ApplicationSearch;

public class ApplicationDAO {
    private final DatabaseConnector client;
    private static final String COLLECTION = "application";

    public ApplicationDAO(DatabaseConnector client){
        Assert.notNull(client, "Client can not be null.");
        this.client = client;
    }

    public List<Application> getAllByUserId(String userId) {
        MongoCollection<Application> collection = this.client.instance(COLLECTION, Application.class);
        List<Application> applications = new ArrayList<>();
        collection.find(Filters.eq("userId", userId)).into(applications);
        return applications;
    }

    public Application getById(String id){
        MongoCollection<Application> collection = this.client.instance(COLLECTION, Application.class);
        Bson query = Filters.eq("_id", new ObjectId(id));
        return collection.find(query).limit(1).first();
    }

    public Application create(Application application) {
        if (application == null || application.getUserId() == null) {
            return null;
        }
        application.setId(null);
        MongoCollection<Application> collection = this.client.instance(COLLECTION, Application.class);

        InsertOneResult writeResult = collection.insertOne(application);
        if (writeResult.getInsertedId() == null) {
            return null;
        }
        application.setId(writeResult.getInsertedId().asObjectId().getValue());
        return application;
    }

    public boolean delete(String id) {
        if (!StringUtils.hasText(id)) {
            return false;
        }

        MongoCollection<Application> collection = this.client.instance(COLLECTION, Application.class);
        Bson query = Filters.eq("_id", new ObjectId(id));

        DeleteResult result = collection.deleteOne(query);
        return result.getDeletedCount() == 1;
    }

    public boolean update(Application application) {
        if (application == null || application.getId() == null) {
            return false;
        }

        MongoCollection<Application> collection = this.client.instance(COLLECTION, Application.class);

        Bson query = Filters.eq("_id", application.getId());
        Bson update = Updates.combine(
                Updates.set("title", application.getTitle()),
                Updates.set("link", application.getLink()),
                Updates.set("userId", application.getUserId()),
                Updates.set("salaryMin", application.getSalaryMin()),
                Updates.set("salaryMax", application.getSalaryMax()),
                Updates.set("keywords", application.getKeywords()),
                Updates.set("employer", application.getEmployer()),
                Updates.set("dateCreated", application.getDateCreated()),
                Updates.set("dateApplied", application.getDateApplied()),
                Updates.set("status", application.getStatus()),
                Updates.set("priority", application.getPriority())
        );
        UpdateResult result = collection.updateOne(query, update);
        return result.getModifiedCount() == 1;
    }

    public List<Application> doFilter(ApplicationSearch search) {
        if (search == null) {
            return new ArrayList<>();
        }

        List<Bson> filters = new ArrayList<>();
        filters.add(Filters.eq("userId", search.getUserId()));
        
        if (StringUtils.hasText(search.getStatus())) {
            AppStatus status = AppStatus.valueOf(search.getStatus());
            filters.add(Filters.eq("status", status));
        }

        if (StringUtils.hasText(search.getPriority())) {
            AppPriority priority = AppPriority.valueOf(search.getPriority());
            filters.add(Filters.eq("priority", priority));
        }

        if (StringUtils.hasText(search.getEmployer())) {
            filters.add(Filters.eq("employer", search.getEmployer()));
        }

        if (search.getDateCreatedStart() != null) {
            filters.add(Filters.gte("dateCreated", search.getDateCreatedStart()));
        }

        if (search.getDateCreatedEnd() != null) {
            filters.add(Filters.lte("dateCreated", search.getDateCreatedEnd()));
        }

        if (search.getDateAppliedEnd() != null) {
            filters.add(Filters.lte("dateApplied", search.getDateAppliedEnd()));
        }

        if (search.getDateAppliedStart() != null) {
            filters.add(Filters.gte("dateApplied", search.getDateAppliedStart()));
        }

        if (search.getKeywords() != null && search.getKeywords().size() > 0) {
            filters.add(Filters.in("keywords", search.getKeywords()));
        }

        if (search.getSalaryMax() != null && search.getSalaryMax() > 0) {
            filters.add(Filters.lte("salaryMax", search.getSalaryMax()));
        }

        if (search.getSalaryMin() != null && search.getSalaryMin() > 0) {
            filters.add(Filters.gte("salaryMin", search.getSalaryMin()));
        }


        Bson finalQuery = Filters.and(filters);

        MongoCollection<Application> collection = this.client.instance(COLLECTION, Application.class); 

        List<Application> results = new ArrayList<>();
        return collection.find(finalQuery).into(results);

    }

    public long batchUpdate(List<String> applicationIds, Map<String, Object> updateFields) {
        try {
            List<Bson> updates = new ArrayList<>();
            
            if (updateFields.containsKey("status")) {
                String statusValue = updateFields.get("status").toString();
                AppStatus status = AppStatus.valueOf(statusValue); 
                updates.add(Updates.set("status", status));
            }
            
            if (updateFields.containsKey("priority")) {
                String priorityValue = updateFields.get("priority").toString();
                AppPriority priority = AppPriority.valueOf(priorityValue);
                updates.add(Updates.set("priority", priority));
            }
            
            if (updates.isEmpty()) {
                return 0;
            }
            
            List<ObjectId> objectIds = applicationIds.stream()
                .map(ObjectId::new)
                .collect(Collectors.toList());
            
            Bson query = Filters.in("_id", objectIds);
            Bson update = Updates.combine(updates);
            
            UpdateResult result = collection.updateMany(query, update);
            return result.getModifiedCount();
        } catch (IllegalArgumentException e) {
            throw new DatabaseException("Invalid enum value provided");
        }
    }

    public long batchDelete(List<String> applicationIds) {
        try {
            if (applicationIds == null || applicationIds.isEmpty()) {
                return 0;
            }

            MongoCollection<Application> collection = this.client.instance(COLLECTION, Application.class);
            
            List<ObjectId> objectIds = new ArrayList<>();
            for (String id : applicationIds) {
                objectIds.add(new ObjectId(id));
            }
            
            Bson query = Filters.in("_id", objectIds);
            DeleteResult result = collection.deleteMany(query);
            return result.getDeletedCount();
        } catch (Exception e) {
            log.error("Batch delete failed", e);
            throw new DatabaseException("Failed to batch delete applications");
        }
    }
}