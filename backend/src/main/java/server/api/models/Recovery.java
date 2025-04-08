package server.api.models;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.bson.types.ObjectId;

@Data
@NoArgsConstructor
@Document(collection = "recovery")
public class Recovery {
    @Id
    private ObjectId id;

    private String username;
    private String email;
    private String token;
}