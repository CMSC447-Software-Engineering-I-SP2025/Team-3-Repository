package server.api.mappers;

import org.bson.types.ObjectId;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.core.JsonGenerator;
import java.io.IOException;

public class ObjectIdSerializer extends JsonSerializer<ObjectId>  {

  @Override
  public void serialize(ObjectId value, JsonGenerator gen, SerializerProvider ser) throws IOException {
    gen.writeString(value.toString());
  }
}
