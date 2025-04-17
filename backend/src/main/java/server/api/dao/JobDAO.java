package server.api.dao;

import java.util.ArrayList;
import java.util.List;

import org.bson.conversions.Bson;
import org.bson.types.ObjectId;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;

import io.jsonwebtoken.lang.Assert;
import server.api.database.DatabaseConnector;
import server.api.models.Job;

public class JobDAO {
  private final DatabaseConnector client;
  private static final String COLLECTION = "job";

  public JobDAO(DatabaseConnector connector) {
    Assert.notNull(connector, "connector cannot be null");
    this.client = connector;
  }

  public Job saveOne(Job job) {
    Assert.notNull(job, "Job cannot be null.");
    Assert.hasText(job.getEmployerId(), "Employer ID Required");
    Assert.notNull(job.getKeywords(), "Keywords cannot be null");
    Assert.notNull(job.getDatePosted(), "Date posted cannot be null");

    MongoCollection<Job> collection = this.client.instance(COLLECTION, Job.class);
    ObjectId insertedId = collection.insertOne(job).getInsertedId().asObjectId().getValue();
    job.setId(insertedId);
    return job;
  }

  public Job findById(String id) {
    Assert.hasText(id, "Id required.");

    ObjectId asOid = new ObjectId(id);
    Bson query = Filters.eq("_id", asOid);
    MongoCollection<Job> collection = this.client.instance(COLLECTION, Job.class);

    return collection.find(query).limit(1).first();
  }

  public List<Job> findByKeywords(List<String> keywords) {
    Assert.notNull(keywords, "Keywords cannot be null");
    Assert.notEmpty(keywords, "Values are required");

    MongoCollection<Job> collection = this.client.instance(COLLECTION, Job.class);
    List<Job> resultArr = new ArrayList<>();
    Bson query = Filters.in("keywords", keywords);
    collection.find(query).into(resultArr);

    return resultArr;
  }
}
