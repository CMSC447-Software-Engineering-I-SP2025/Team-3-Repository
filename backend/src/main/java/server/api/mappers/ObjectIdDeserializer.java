package server.api.mappers;

import org.bson.types.ObjectId;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.core.JsonParser;
import java.io.IOException;

public class ObjectIdDeserializer extends StdDeserializer<ObjectId> {

  public ObjectIdDeserializer() { this(null); }
  public ObjectIdDeserializer(Class<?> vc) { super(vc); }

  @Override
  public ObjectId deserialize(JsonParser jp, DeserializationContext ctx) throws IOException {
    JsonNode node = jp.getCodec().readTree(jp);
    String idAsString = node.get("id").asText();
    return new ObjectId(idAsString);
  }
}
