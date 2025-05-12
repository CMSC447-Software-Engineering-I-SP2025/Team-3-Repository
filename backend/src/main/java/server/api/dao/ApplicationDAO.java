package server.api.dao;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.util.Assert;
import java.util.List;
import java.util.ArrayList;
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

    public List<Application> findInListAndUid(String uid, List<String> appids) {
        List<ObjectId> ids = appids.stream().map(x -> new ObjectId(x)).toList();
        Bson query =  Filters.and(Filters.eq("userId", uid), Filters.in("_id", ids));

        MongoCollection<Application> col = this.client.instance(COLLECTION, Application.class);
        List<Application> apps = new ArrayList<>();
        col.find(query).into(apps);
        return apps;
    }

    public Boolean batchPriority(List<String> appids, AppPriority prior, String uid) {
        List<ObjectId> ids = appids.stream().map(x -> new ObjectId(x)).toList();
        Bson query =  Filters.and(
            Filters.eq("userId", uid),
            Filters.in("_id", ids)
        );

        Bson update = Updates.set("priority", prior);

        MongoCollection<Application> col = this.client.instance(COLLECTION, Application.class);
        UpdateResult result = col.updateMany(query, update);

        if (result.getModifiedCount() == appids.size()) {
            return true;
        }
        return false;
    }

    public Boolean batchStatus(List<String> appids, AppStatus status, String uid) {
        List<ObjectId> ids = appids.stream().map(x -> new ObjectId(x)).toList();
        Bson query =  Filters.and(
            Filters.eq("userId", uid),
            Filters.in("_id", ids)
        );

        Bson update = Updates.set("status", status);

        MongoCollection<Application> col = this.client.instance(COLLECTION, Application.class);
        UpdateResult result = col.updateMany(query, update);

        if (result.getModifiedCount() == appids.size()) {
            return true;
        }
        return false;
    }

    public Boolean batchDelete(List<String> appids, String uid) {
        List<ObjectId> ids = appids.stream().map(x -> new ObjectId(x)).toList();
        Bson query =  Filters.and(
            Filters.eq("userId", uid),
            Filters.in("_id", ids)
        );


        MongoCollection<Application> col = this.client.instance(COLLECTION, Application.class);
        DeleteResult result = col.deleteMany(query);

        if (result.getDeletedCount() == appids.size()) {
            return true;
        }

        return false;
    }

}