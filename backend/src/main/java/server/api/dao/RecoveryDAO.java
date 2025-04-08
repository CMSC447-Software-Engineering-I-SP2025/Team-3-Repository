package server.api.dao;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Indexes;
import com.mongodb.client.model.IndexOptions;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.InsertOneResult;

import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.springframework.util.Assert;
import org.springframework.util.StringUtils;

import server.api.models.Recovery;
import server.api.database.DatabaseConnector;

import java.util.concurrent.TimeUnit;

public class RecoveryDAO {
    private final DatabaseConnector client;
    private static final String COLLECTION = "recovery";

    public RecoveryDAO(DatabaseConnector client) {
        Assert.notNull(client, "Client cannot be null.");
        this.client = client;
        createTTLIndex();
    }

    private void createTTLIndex() {
        MongoCollection<Recovery> collection = this.client.instance(COLLECTION, Recovery.class);
        IndexOptions options = new IndexOptions().expireAfter(600L, TimeUnit.SECONDS);
        collection.createIndex(Indexes.ascending("createdAt"), options);
    }

    public Recovery createOne(Recovery recovery) {
        if (recovery == null) {
            return null;
        }

        recovery.setId(null);
        MongoCollection<Recovery> collection = this.client.instance(COLLECTION, Recovery.class);
        InsertOneResult result = collection.insertOne(recovery);

        if (result.getInsertedId() == null) {
            return null;
        }

        recovery.setId(result.getInsertedId().asObjectId().getValue());
        return recovery;
    }

    public Recovery findById(ObjectId id) {
        MongoCollection<Recovery> collection = this.client.instance(COLLECTION, Recovery.class);
        Bson query = Filters.eq("_id", id);
        return collection.find(query).limit(1).first();
    }

    public boolean deleteByEmail(String email) {
        if (!StringUtils.hasText(email)) return false;

        MongoCollection<Recovery> collection = this.client.instance(COLLECTION, Recovery.class);
        Bson query = Filters.eq("email", email);

        DeleteResult result = collection.deleteMany(query);
        return result.getDeletedCount() > 0;
    }

    public boolean deleteById(String id) {
        if (!StringUtils.hasText(id)) return false;

        MongoCollection<Recovery> collection = this.client.instance(COLLECTION, Recovery.class);
        Bson query = Filters.eq("_id", new ObjectId(id));

        DeleteResult result = collection.deleteOne(query);
        return result.getDeletedCount() == 1;
    }
}
