package server.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import server.api.dao.ApplicationDAO;
import server.api.dao.AuthDAO;
import server.api.dao.UserDAO;
import server.api.database.DatabaseConnector;
import server.api.mappers.ObjectIdSerializer;
import server.api.mappers.ObjectIdDeserializer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.bson.types.ObjectId;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


@Configuration
public class Config {

  @Bean
  public ApplicationDAO appDao(DatabaseConnector client) {
    return new ApplicationDAO(client);
  }

  @Bean
  public AuthDAO authDao(DatabaseConnector client) {
    return new AuthDAO(client);
  }
  
  @Bean
  public UserDAO userDao(DatabaseConnector client) {
    return new UserDAO(client);
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

  @Bean
  public BCryptPasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder(12);
  }

}

