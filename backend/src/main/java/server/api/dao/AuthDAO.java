package server.api.dao;
import org.springframework.util.Assert;
import java.util.List;
import java.util.ArrayList;

import server.api.models.Authorization;
import server.api.database.DatabaseConnector;

import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Updates;
import com.mongodb.client.result.InsertOneResult;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;

import org.springframework.util.StringUtils; 

import org.bson.types.ObjectId;
import org.bson.conversions.Bson;

public class AuthDAO {
  private final DatabaseConnector client;
  private static final String COLLECTION = "authorization";

  public AuthDAO(DatabaseConnector client) {
    Assert.notNull(client, "Client cannot be null.");
    this.client = client;
  }


  /**
   * Get all the authorizations in the collection
   * @return List<Authorization> all authorizations.
  */
  public List<Authorization> getAll() {
    MongoCollection<Authorization> collection = this.client.instance(COLLECTION, Authorization.class); 

    List<Authorization> auths = new ArrayList<>();
    collection.find().into(auths);
    
    return auths;
  }

  // Simple method to query a single document by ID
  public Authorization findById(String id) {
    MongoCollection<Authorization> collection = this.client.instance(COLLECTION, Authorization.class); 

    Bson query = Filters.eq("_id", new ObjectId(id));
    Authorization found = collection.find(query).limit(1).first();

    return found;
  }

  public Authorization createOne(Authorization auth) {
    if (auth == null) { return null; }
    
    // we dont ever want the caller specifying the id.
    auth.setId(null);
    MongoCollection<Authorization> collection = this.client.instance(COLLECTION, Authorization.class); 

    InsertOneResult writeResult = collection.insertOne(auth);
    if (writeResult.getInsertedId() == null) { return null; }


    // return the ID so the caller knows it worked.
    // not required, but nice
    auth.setId(writeResult.getInsertedId().asObjectId().getValue());
    return auth;
  }

  public boolean deleteOne(String id) {
    if (!StringUtils.hasText(id)) { return false; }

    MongoCollection<Authorization> collection = this.client.instance(COLLECTION, Authorization.class); 
    Bson query = Filters.eq("_id", new ObjectId(id));

    DeleteResult result = collection.deleteOne(query); 

    return result.getDeletedCount() == 1;
  }

  public boolean updateOne(Authorization auth) {
    if (auth == null || auth.getId() == null) {
      return false;
    }

    MongoCollection<Authorization> collection = this.client.instance(COLLECTION, Authorization.class); 

    Bson query = Filters.eq("_id", auth.getId());
    Bson update = Updates.combine(
      Updates.set("uid", auth.getUid()),
      Updates.set("token", auth.getToken())
    );

    UpdateResult result = collection.updateOne(query, update);
    return result.getModifiedCount() == 1;
  }

}
