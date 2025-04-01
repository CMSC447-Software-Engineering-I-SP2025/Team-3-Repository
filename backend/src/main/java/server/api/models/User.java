package server.api.models;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import java.util.List;

@Data
@NoArgsConstructor
@Document(collection = "users")
public class User {
    @Id
    private ObjectId id;

    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private List<String> skills;
    private String passwordHash;
}
