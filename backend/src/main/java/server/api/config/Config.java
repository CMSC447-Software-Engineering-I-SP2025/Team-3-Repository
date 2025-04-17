package server.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import server.api.dao.ApplicationDAO;
import server.api.dao.AuthDAO;
import server.api.dao.JobDAO;
import server.api.dao.UserDAO;
import server.api.dao.RecoveryDAO;
import server.api.database.DatabaseConnector;
import server.api.mappers.ObjectIdSerializer;
import server.api.mappers.InstantModule;
import server.api.mappers.ObjectIdDeserializer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.datatype.jsr310.deser.InstantDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.InstantSerializer;

import java.time.Instant;

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
  public RecoveryDAO recoveryDao(DatabaseConnector client) {
    return new RecoveryDAO(client);
  }

  @Bean
  public JobDAO jobDao(DatabaseConnector client) {
    return new JobDAO(client);
  }

  @Bean
  public ObjectMapper objectMapper() {
    ObjectMapper mapper = new ObjectMapper();
    SimpleModule module = new SimpleModule("ObjectIdMapper");
    module.addSerializer(ObjectId.class, new ObjectIdSerializer());
    module.addDeserializer(ObjectId.class, new ObjectIdDeserializer());
    mapper.registerModule(module);
    mapper.registerModule(InstantModule.build());
    return mapper;
  }

  @Bean
  public BCryptPasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder(12);
  }

}

