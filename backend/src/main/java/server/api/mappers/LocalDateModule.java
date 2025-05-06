package server.api.mappers;

import com.fasterxml.jackson.databind.module.SimpleModule;
import java.time.LocalDate;

public class LocalDateModule {
  private static final String MODULE_NAME = "LocalDateMapper";

  public static SimpleModule build() {
    SimpleModule module = new SimpleModule(MODULE_NAME);
    module.addSerializer(LocalDate.class, new LocalDateSerializer());

    return module;
  }
}
