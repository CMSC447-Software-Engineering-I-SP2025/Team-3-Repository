package server.api.database;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import server.api.config.DatabaseConfig;

// codecs, mogodb ... urhg
import com.mongodb.client.*;
import com.mongodb.MongoException;
import org.bson.codecs.configuration.CodecProvider;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;
import static com.mongodb.MongoClientSettings.getDefaultCodecRegistry;
import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;

@Component
public class DatabaseConnector {
  @Autowired
  private DatabaseConfig databaseConfig;

  // intentionally left empty
  public DatabaseConnector() { }

  /**
   * Helper method to connect to the MongoDB Instance.
   * @return MongoDatabase the database, assuming it connected.
  */
  public <T> MongoCollection<T> instance(String coll, Class<T> target) {
    CodecProvider provider = PojoCodecProvider.builder().automatic(true).build();
    CodecRegistry registry = fromRegistries(getDefaultCodecRegistry(), fromProviders(provider));

    com.mongodb.client.MongoClient client;
    String uri = databaseConfig.getUri();

    try { 
      client = MongoClients.create(uri);
    } catch (MongoException er) {
      return null;
    }

    MongoDatabase database = client
      .getDatabase(databaseConfig.getName())
      .withCodecRegistry(registry);
    MongoCollection<T> collection = database.getCollection(coll, target);
    return collection;
  }
}
