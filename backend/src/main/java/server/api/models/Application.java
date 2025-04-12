package server.api.models;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import java.time.Instant;
import java.util.List;

@Data
@NoArgsConstructor
@Document(collection = "application")
public class Application {
    @Id
    private ObjectId id;
    private String userId;
    private String title;
    private String link;
    private Double salaryMin;
    private Double salaryMax;
    private List<String> keywords;
    private String employer;
    private Instant dateCreated;
    private Instant dateApplied;

    private AppStatus status;
    private AppPriority priority;

}