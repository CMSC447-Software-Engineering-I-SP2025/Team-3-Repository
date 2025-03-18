package server.api.dao;
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
import server.api.models.Application;

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
                Updates.set("salary", application.getSalary()),
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
}