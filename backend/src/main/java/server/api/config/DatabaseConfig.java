package server.api.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

// simple database properties object
@Data
@Configuration
@ConfigurationProperties(prefix = "database")
public class DatabaseConfig {
  private String uri;
  private String name;
}
