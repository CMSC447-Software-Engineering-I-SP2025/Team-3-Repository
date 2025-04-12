package server.api.mappers;

import java.time.Instant;

import com.fasterxml.jackson.core.util.JacksonFeatureSet;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeFeature;
import com.fasterxml.jackson.datatype.jsr310.deser.InstantDeserializer;

public class InstantModule {
  private static final JacksonFeatureSet<JavaTimeFeature> features = JacksonFeatureSet.fromDefaults(JavaTimeFeature.values());
  private static final String MODULE_NAME = "CustomInstantMapper";

  /**
   * Simple helper to build the instant module for Jackson.
   * @return
   */
  public static SimpleModule build() {
    SimpleModule module = new SimpleModule(MODULE_NAME);
    module.addDeserializer(
      Instant.class,
      InstantDeserializer.INSTANT.withFeatures(features)
    );

    module.addSerializer(
      Instant.class,
      new InstantSerializer()
    );

    return module;
  }
}
