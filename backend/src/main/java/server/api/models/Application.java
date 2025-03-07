package server.api.models;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import java.util.List;

@Data
@NoArgsConstructor
@Document(collection = "application")
public class Application {
    @Id
    private String id;
    private String title;
    private String link;
    private String salary;
    private List<String> keywords;
    private String employer;
    private String dateCreated;
    private String dateApplied;

    private AppStatus status;
    private AppPriority priority;

}