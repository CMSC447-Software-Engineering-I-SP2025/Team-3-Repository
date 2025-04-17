package server.api.models;

import java.time.Instant;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document( collection = "job" )
public class Job {
  @Id
  private ObjectId id;
  private String employerId;
  private List<String> keywords;
  private Instant datePosted;
}
