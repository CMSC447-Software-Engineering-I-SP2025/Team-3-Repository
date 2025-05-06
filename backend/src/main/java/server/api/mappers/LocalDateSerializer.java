package server.api.mappers;
import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import java.time.LocalDate;

public class LocalDateSerializer extends JsonSerializer<LocalDate> {

  @Override
  public void serialize(LocalDate value, JsonGenerator generator, SerializerProvider provider) throws IOException {
    generator.writeString(value.toString());
  }
}
