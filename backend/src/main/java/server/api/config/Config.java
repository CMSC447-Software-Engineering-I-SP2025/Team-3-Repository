package server.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import server.api.dao.AuthDAO;
import server.api.database.DatabaseConnector;
import server.api.mappers.ObjectIdSerializer;
import server.api.mappers.ObjectIdDeserializer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.bson.types.ObjectId;


@Configuration
public class Config {
  @Bean
  public AuthDAO authDao(DatabaseConnector client) {
    return new AuthDAO(client);
  }

  @Bean
  public ObjectMapper objectMapper() {
    ObjectMapper mapper = new ObjectMapper();
    SimpleModule module = new SimpleModule("ObjectIdMapper");
    module.addSerializer(ObjectId.class, new ObjectIdSerializer());
    module.addDeserializer(ObjectId.class, new ObjectIdDeserializer());
    mapper.registerModule(module);
    return mapper;
  }

}

